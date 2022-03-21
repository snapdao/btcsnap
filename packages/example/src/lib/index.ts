import * as bip32 from 'bip32';
import { payments, networks } from 'bitcoinjs-lib'

export enum BitcoinNetwork {
    Main,
    Test
}

export enum BitcoinScriptType {
    P2PKH,
    P2SH,
    P2WPKH
}

type networkAndScriptType = {
    [key: string]: { network: BitcoinNetwork, scriptType: BitcoinScriptType }
}

const networkAndScriptMap: networkAndScriptType = {
    "xpub": { network: BitcoinNetwork.Main, scriptType: BitcoinScriptType.P2PKH },
    "xprv": { network: BitcoinNetwork.Main, scriptType: BitcoinScriptType.P2PKH },
    "ypub": { network: BitcoinNetwork.Main, scriptType: BitcoinScriptType.P2SH },
    "yprv": { network: BitcoinNetwork.Main, scriptType: BitcoinScriptType.P2SH },
    "zpub": { network: BitcoinNetwork.Main, scriptType: BitcoinScriptType.P2WPKH },
    "zprv": { network: BitcoinNetwork.Main, scriptType: BitcoinScriptType.P2WPKH },
    "tpub": { network: BitcoinNetwork.Main, scriptType: BitcoinScriptType.P2PKH },
    "tprv": { network: BitcoinNetwork.Main, scriptType: BitcoinScriptType.P2PKH },
    "upub": { network: BitcoinNetwork.Main, scriptType: BitcoinScriptType.P2SH },
    "uprv": { network: BitcoinNetwork.Main, scriptType: BitcoinScriptType.P2SH },
    "vpub": { network: BitcoinNetwork.Main, scriptType: BitcoinScriptType.P2WPKH },
    "vprv": { network: BitcoinNetwork.Main, scriptType: BitcoinScriptType.P2WPKH },
}

const deteckNetworkAndScriptType = (extendedPubKey: string) => {

    const keyPrefix = Object.keys(networkAndScriptMap).find(each => extendedPubKey.slice(0, 4) === each)

    if (keyPrefix) {
        return networkAndScriptMap[keyPrefix]
    }
    throw new Error('Unknown network or script Type')
}


const caculateBitcoinAddress = (pubKey: Buffer, network: BitcoinNetwork, scriptType: BitcoinScriptType) => {
    let networkConfig;
    if (network === BitcoinNetwork.Main) {
        networkConfig = networks.bitcoin
    } else {
        networkConfig = networks.testnet
    }
    if (scriptType === BitcoinScriptType.P2PKH) {
        const { address } = payments.p2pkh({ pubkey: pubKey, network: networkConfig })
        return address
    } else if (scriptType === BitcoinScriptType.P2SH) {
        const { address } = payments.p2sh({
            redeem: payments.p2wpkh({
                pubkey: pubKey,
                network: networkConfig,
            }),
            network: networkConfig,
        });
        return address
    } else if (scriptType === BitcoinScriptType.P2WPKH) {
        const { address } = payments.p2wpkh({
            pubkey: pubKey,
            network: networkConfig,
        });
        return address
    } else {
        throw new Error('Unknown network or script Type to caculate the address')
    }
}

const batchGenerateAddreses = (changeIndex: number) => (node: bip32.BIP32Interface, network: BitcoinNetwork, scriptType: BitcoinScriptType, fromIndex: number, toIndex: number) => {
    let result = []
    for (let i = fromIndex; i < toIndex; i++) {
        const childNode = node.derive(changeIndex).derive(i)
        result.push(caculateBitcoinAddress(childNode.publicKey, network, scriptType))
    }
    return result
}

export const genreateAddresses = (extendedPubKey: string, fromIndex = 0, toIndex = 10) => {
    const { network, scriptType } = deteckNetworkAndScriptType(extendedPubKey);
    let networkConfig;
    if (network === BitcoinNetwork.Main) {
        networkConfig = networks.bitcoin
    } else {
        networkConfig = networks.testnet
    }
    const node = bip32.fromBase58(extendedPubKey, networkConfig);

    return {
        'recieve': batchGenerateAddreses(0)(node, network, scriptType, fromIndex, toIndex),
        'change': batchGenerateAddreses(1)(node, network, scriptType, fromIndex, toIndex),
    }

}


export const queryUtxos = async (addresses: string[], includeHex = false) => {
    
}