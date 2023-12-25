import secp256k1 from 'secp256k1';
import { BIP32Interface } from 'bip32';
import { HDSigner, Psbt, Signer } from 'bitcoinjs-lib';
import { isTaprootInput } from "bitcoinjs-lib/src/psbt/bip371";
import { BitcoinNetwork, SignInputOptions, SignPsbtOptions } from '../interface';
import { PsbtValidator } from '../bitcoin/PsbtValidator';
import { PsbtHelper } from '../bitcoin/PsbtHelper';
import { getNetwork } from './getNetwork';
import { signAllInputsHD, signTapInputHD, validateSignaturesOfAllInputs } from './tapSigner';
import * as ecc from "@bitcoin-js/tiny-secp256k1-asmjs";

export class AccountSigner implements HDSigner, Signer {
    publicKey: Buffer;
    fingerprint: Buffer;

    private readonly node: BIP32Interface
    constructor(accountNode: BIP32Interface, mfp?: Buffer) {
        this.node = accountNode;
        this.publicKey = this.node.publicKey
        this.fingerprint = mfp || this.node.fingerprint
    }

    // m / purpose' / coinType' / account' / change / addressIndex
    derivePath(path: string): AccountSigner {
        try {
            let splitPath = path.split('/');
            if (splitPath[0] == 'm') {
                splitPath = splitPath.slice(1)
            }
            if (splitPath.length > 2) {
                splitPath = splitPath.slice(-2);
            }
            const childNode = splitPath.reduce((prevHd, indexStr) => {
                let index;
                if (indexStr.slice(-1) === `'`) {
                    index = parseInt(indexStr.slice(0, -1), 10);
                    return prevHd.deriveHardened(index);
                } else {
                    index = parseInt(indexStr, 10);
                    return prevHd.derive(index);
                }
            }, this.node)
            return new AccountSigner(childNode, this.fingerprint)
        } catch (e) {
            throw new Error('invalid path')
        }
    }

    sign(hash: Buffer): Buffer {
        return this.node.sign(hash)
    }

    signSchnorr(hash: Buffer): Buffer {
        return this.node.signSchnorr(hash)
    }

    tweak(t: Buffer): Signer {
        return this.node.tweak(t);
    }
}

const validator = (pubkey: Buffer, msghash: Buffer, signature: Buffer) => {
    return secp256k1.ecdsaVerify(new Uint8Array(signature), new Uint8Array(msghash), new Uint8Array(pubkey))
}

const schnorrValidator = (pubkey: Buffer, msghash: Buffer, signature: Buffer) => {
    return ecc.verifySchnorr(msghash, pubkey, signature);
}

export class BtcPsbt {
    private psbt: Psbt;
    private network: BitcoinNetwork;

    constructor(base64Psbt: string, network: BitcoinNetwork) {
        this.psbt = Psbt.fromBase64(base64Psbt, { network: getNetwork(network) })
        this.network = network;
    }

    validatePsbt(accountSigner: AccountSigner) {
        const validator = new PsbtValidator(this.psbt, this.network);
        return validator.validate(accountSigner);
    }

    extractPsbtJson() {
        const psbtHelper = new PsbtHelper(this.psbt, this.network);
        const changeAddress = psbtHelper.changeAddresses
        const unit = this.network === BitcoinNetwork.Main ? 'sats' : 'tsats';

        const transaction = {
            from: psbtHelper.fromAddresses.join(","),
            to: psbtHelper.toAddresses.join(","),
            value: `${psbtHelper.sendAmount} ${unit}`,
            fee: `${psbtHelper.fee} ${unit}`,
            network: `${this.network}net`,
        }

        if (changeAddress.length > 0) {
            return { ...transaction, changeAddress: changeAddress.join(",") }
        }
        return transaction
    }

    extractPsbtJsonString() {
        return Object.entries(this.extractPsbtJson()).map(([key, value]) => `${key}: ${value}\n`).join('')
    }

    signInput(inputIndex: number, accountSigner: AccountSigner, opts: SignInputOptions = {}) {
        try {
            if (isTaprootInput(this.psbt.data.inputs[inputIndex])) {
                signTapInputHD(this.psbt, inputIndex, accountSigner, opts);
            } else {
                this.psbt.signInputHD(inputIndex, accountSigner);
            }
            return this.psbt.toBase64();
        } catch (e) {
            throw new Error(e);
        }
    }

    signPsbt(accountSigner: AccountSigner, opts: SignPsbtOptions = {}) {
        try {
            const signInputOpts = opts.signInputOpts !== undefined ? opts.signInputOpts : new Array<SignInputOptions>(this.psbt.data.inputs.length).fill({});
            signAllInputsHD(this.psbt, accountSigner, signInputOpts);
            if (validateSignaturesOfAllInputs(this.psbt, validator, schnorrValidator)) {
                this.psbt.finalizeAllInputs();
                const txId = this.psbt.extractTransaction().getId();
                const txHex = this.psbt.extractTransaction().toHex();
                return {
                    txId,
                    txHex
                }
            } else {
                throw new Error('Signature verification failed');
            }
        } catch (e) {
            throw new Error('Sign transaction failed');
        }
    }
}
