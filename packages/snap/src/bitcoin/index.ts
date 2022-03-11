import secp256k1 from 'secp256k1';
import { BIP32Interface } from 'bip32';
import { Psbt, HDSigner, networks } from 'bitcoinjs-lib'

import {BitcoinNetwork} from '../interface'


export class AccountSigner implements HDSigner {
    publicKey: Buffer;
    fingerprint: Buffer;

    private node: BIP32Interface
    constructor(accountNode: BIP32Interface) {
        this.node = accountNode;
        this.publicKey = this.node.publicKey
        this.fingerprint = this.node.fingerprint
    }

    derivePath(path: string): HDSigner {
        let splitPath = path.split('/');
        if (splitPath[0] == 'm') {
            splitPath = splitPath.slice(1)
        }
        const childNode = splitPath.reduce((prevHd, indexStr) => {
            let index;
            if (indexStr.slice(-1) === `'`) {
                index = parseInt(indexStr.slice(0, -1), 10);
                return prevHd.deriveHardened(index);
            }
            else {
                index = parseInt(indexStr, 10);
                return prevHd.derive(index);
            }
        }, this.node)
        return new AccountSigner(childNode)
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
    constructor(base64Psbt: string) {
        this.tx = Psbt.fromBase64(base64Psbt)
    }

    validateTx(accountSigner: AccountSigner) {
        let result = true;
        this.tx.txInputs.forEach((each, index) => {
            result = this.tx.inputHasHDKey(index, accountSigner)
        })
        return result;
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
                index: each.value,
                address: each.address
            }))
        }
    }

    extractPsbtJsonString() {
        return JSON.stringify(this.extractPsbtJson(), null, 2);
    }


    signTx(accountSigner: AccountSigner) {
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
            throw new Error('signature verification failed')
        }
    }
}


export function getNetwork(network: BitcoinNetwork) {
    switch (network) {
        case BitcoinNetwork.Main:
            return networks.bitcoin
        case BitcoinNetwork.Test:
            return networks.regtest
        default:
            return networks.bitcoin
    }
}

