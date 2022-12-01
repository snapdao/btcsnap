import secp256k1 from 'secp256k1';
import { BIP32Interface } from 'bip32';
import { HDSigner, Psbt } from 'bitcoinjs-lib';
import { BitcoinNetwork } from '../interface';
import { PsbtValidator } from '../bitcoin/PsbtValidator';
import { PsbtHelper } from '../bitcoin/PsbtHelper';
import { getNetwork } from './getNetwork';

export class AccountSigner implements HDSigner {
    publicKey: Buffer;
    fingerprint: Buffer;

    private readonly node: BIP32Interface
    constructor(accountNode: BIP32Interface, mfp?: Buffer) {
        this.node = accountNode;
        this.publicKey = this.node.publicKey
        this.fingerprint = mfp || this.node.fingerprint
    }

    derivePath(path: string): HDSigner {
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
}


const validator = (pubkey: Buffer, msghash: Buffer, signature: Buffer) => {
    return secp256k1.ecdsaVerify(new Uint8Array(signature), new Uint8Array(msghash), new Uint8Array(pubkey))
}


export class BtcTx {
    private tx: Psbt;
    private network: BitcoinNetwork;

    constructor(base64Psbt: string, network: BitcoinNetwork) {
        this.tx = Psbt.fromBase64(base64Psbt, { network: getNetwork(network) })
        this.network = network;
    }

    validateTx(accountSigner: AccountSigner) {
        const validator = new PsbtValidator(this.tx, this.network);
        return validator.validate(accountSigner);
    }

    extractPsbtJson() {
        const psbtHelper = new PsbtHelper(this.tx, this.network);
        const changeAddress = psbtHelper.changeAddresses

        const transaction = {
            from: psbtHelper.fromAddresses.join(","),
            to: psbtHelper.toAddresses.join(","),
            value: psbtHelper.sendAmount,
            fee: psbtHelper.fee,
            network: this.network,
        }

        if(changeAddress.length > 0){
            return {...transaction, changeAddress: changeAddress.join(",")}
        }
        return transaction
    }

    extractPsbtJsonString() {
        return Object.entries(this.extractPsbtJson()).map(([key, value]) => `${key}: ${value}\n`).join('')
    }


    signTx(accountSigner: AccountSigner) {
        try {
            this.tx.signAllInputsHD(accountSigner)
            if (this.tx.validateSignaturesOfAllInputs(validator)) {
                this.tx.finalizeAllInputs();
                const txId = this.tx.extractTransaction().getId();
                const txHex = this.tx.extractTransaction().toHex();
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
