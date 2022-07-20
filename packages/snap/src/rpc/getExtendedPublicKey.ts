import * as bip32 from 'bip32';
import { Network, networks } from 'bitcoinjs-lib';
import { BIP32Interface } from 'bip32';
import { Wallet, ScriptType, BIP44CoinTypeNode } from "../interface";


const HIGHEST_BIT = 0x80000000;



export async function extractAccoutPrivateKey(wallet: Wallet, network: Network): Promise<BIP32Interface> {

    let coinType: number = 0;
    if (network != networks.bitcoin) {
        coinType = 1
    }

    const methodName = `snap_getBip44Entropy_${coinType}`
    const bitcoin44node = await wallet.request({
        method: methodName
    }) as BIP44CoinTypeNode
    const privateKeyBuffer = Buffer.from(bitcoin44node.privateKey, "hex")
    const chainCodeBuffer = Buffer.from(bitcoin44node.chainCode, "hex")
    let node: BIP32Interface = bip32.fromPrivateKey(privateKeyBuffer, chainCodeBuffer, network)
    //@ts-ignore 
    // ignore checking since no function to set depth for node
    node.__DEPTH = 2;
    //@ts-ignore
    // ignore checking since no function to set index for node
    node.__INDEX = HIGHEST_BIT + 0;
    return node.deriveHardened(0);
}


export async function getExtendedPublicKey(wallet: Wallet, scriptType: ScriptType, network: Network): Promise<string> {
    switch (scriptType) {
        case ScriptType.P2PKH:
            const result = await wallet.request({
                method: 'snap_confirm',
                params: [
                  {
                    prompt: 'Access your extended public key?',
                    description: 'Do you want to allow this app to access your extended public key?',
                  },
                ],
            });

            if(result) {
                let accountNode = await extractAccoutPrivateKey(wallet, network)
                let accountPublicKey = accountNode.neutered();
                return accountPublicKey.toBase58();
            } else {
                throw new Error('User reject to access the key')
            }
            
        default:
            throw new Error('ScriptType is not supported.');
    }
}