import * as bip32 from 'bip32';
import {  BIP32Interface } from 'bip32';
import { Wallet, ScriptType, BIP44CoinTypeNode } from "../interface";


const HIGHEST_BIT = 0x80000000;


export async function getExtendedPublicKey(wallet: Wallet, scriptType: ScriptType): Promise<string> {
    switch (scriptType) {
        case ScriptType.P2PKH:
            const methodName = `snap_getBip44Entropy_${0}`
            const bitcoin44node =  await wallet.request({
                method: methodName
            }) as BIP44CoinTypeNode
            const keyBuffer = Buffer.from(bitcoin44node.key, "base64")
            const privateKeyBuffer =keyBuffer.slice(0,32)
            const chainCodeBuffer = keyBuffer.slice(32,64)
            let node: BIP32Interface = bip32.fromPrivateKey(privateKeyBuffer, chainCodeBuffer)
            //@ts-ignore 
            // ignore checking since no function to set depth for node
            node.__DEPTH = 2;
            //@ts-ignore
            // ignore checking since no function to set index for node
            node.__INDEX = HIGHEST_BIT;
            let accountNode = node.deriveHardened(0);
            let accountPublicKey = accountNode.neutered();
            return accountPublicKey.toBase58();
        default:
            throw new Error('ScriptType is not supported.');
    }
}