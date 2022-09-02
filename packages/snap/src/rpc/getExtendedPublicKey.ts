import * as bip32 from 'bip32';
import { BIP32Interface } from 'bip32';
import { Network, networks } from 'bitcoinjs-lib';
import { PersistedData, ScriptType, SLIP10Node, Wallet } from "../interface";
import { convertXpub } from "../bitcoin/xpubConverter";
import { sha256 } from "../bitcoin/crypto";

const pathMap: Record<ScriptType, string[]> = {
    [ScriptType.P2PKH]: ['m', "44'", "0'"],
    [ScriptType.P2SH_P2WPKH]: ['m', "49'", "0'"],
    [ScriptType.P2WPKH]: ['m', "84'", "0'"]
}

export async function extractAccountPrivateKey(wallet: Wallet, network: Network, scriptType: ScriptType): Promise<BIP32Interface> {
    const path = pathMap[scriptType]
    if (network != networks.bitcoin) {
        path[path.length - 1] = "1'";
    }

    const slip10Node = await wallet.request({
        method: "snap_getBip32Entropy",
        params: {
            path,
            curve: "secp256k1"
        },
    }) as SLIP10Node

    const privateKeyBuffer = Buffer.from(slip10Node.privateKey, "hex")
    const chainCodeBuffer = Buffer.from(slip10Node.chainCode, "hex")
    const node: BIP32Interface = bip32.fromPrivateKey(privateKeyBuffer, chainCodeBuffer, network)
    //@ts-ignore 
    // ignore checking since no function to set depth for node
    node.__DEPTH = slip10Node.depth;
    //@ts-ignore
    // ignore checking since no function to set index for node
    node.__INDEX = slip10Node.index;
    return node.deriveHardened(0);
}


async function getMFP(wallet: Wallet, xpub: string): Promise<string> {
    const persistedData: PersistedData = await wallet.request({
        method: 'snap_manageState',
        params: ['get'],
    });

    if(persistedData && persistedData.mfp) {
        return persistedData.mfp;
    } else {
        const hashBuffer = sha256(Buffer.from(xpub, "hex"));
        const mfp = hashBuffer.toString("hex").slice(0, 8);

        await wallet.request({
            method: 'snap_manageState',
            params: ['update', { mfp }],
        });
        return mfp;
    }
}


export async function getExtendedPublicKey(wallet: Wallet, scriptType: ScriptType, network: Network): Promise<{xpub: string, mfp: string}> {
    switch (scriptType) {
        case ScriptType.P2PKH:
        case ScriptType.P2WPKH:
        case ScriptType.P2SH_P2WPKH:
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
                const accountNode = await extractAccountPrivateKey(wallet, network, scriptType)
                const accountPublicKey = accountNode.neutered();
                const xpub = convertXpub(accountPublicKey.toBase58(), scriptType, network);
                const mfp = await getMFP(wallet, xpub);

                return { mfp, xpub };
            } else {
                throw new Error('User reject to access the key')
            }
            
        default:
            throw new Error('ScriptType is not supported.');
    }
}