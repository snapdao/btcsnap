import secp256k1 from 'secp256k1';
import { BIP32Interface } from 'bip32';
import { Psbt, HDSigner, Network, networks } from 'bitcoinjs-lib'
import { BitcoinNetwork } from "../interface"

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
    constructor(base64Psbt: string, network = networks.bitcoin) {
        this.tx = Psbt.fromBase64(base64Psbt, { network })
    }

    validateTx(accountSigner: AccountSigner) {
        let result = true;
        this.tx.txInputs.forEach((each, index) => {
            result = this.tx.inputHasHDKey(index, accountSigner)
        })
        const changeAddressValid = this.tx.txOutputs.some((_, index) =>
            this.tx.outputHasHDKey(index, accountSigner)
        );

        return result && changeAddressValid;
    }

    extractPsbtJson() {
        return {
            inputs: this.tx.txInputs.map(each => ({
                prevTxId: each.hash.toString('hex'),
                index: each.index,
                sequence: each.sequence
            })),
            outputs: this.tx.txOutputs.map(each => ({
                script: each.script.toString('hex'),
                value: each.value,
                address: each.address
            }))
        }
    }

    extractPsbtJsonString() {
        return JSON.stringify(this.extractPsbtJson(), null, 2);
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


export function getNetwork(network: BitcoinNetwork): Network {
    switch (network) {
        case BitcoinNetwork.Main:
            return networks.bitcoin
        case BitcoinNetwork.Test:
            return networks.testnet
        default:
            return networks.bitcoin
    }
}

