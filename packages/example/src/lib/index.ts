import * as bip32 from 'bip32';
import { payments, networks } from 'bitcoinjs-lib'
import { BitcoinNetwork, BitcoinScriptType, Utxo } from '../interface'
import coinSelect from 'coinselect'


type networkAndScriptType = {
    [key: string]: { network: BitcoinNetwork, scriptType: BitcoinScriptType, config: { private: number, public: number } }
}

export const networkAndScriptMap: networkAndScriptType = {
    "xpub": { network: BitcoinNetwork.Main, scriptType: BitcoinScriptType.P2PKH, config: { private: 0x0488ade4, public: 0x0488b21e } },
    "xprv": { network: BitcoinNetwork.Main, scriptType: BitcoinScriptType.P2PKH, config: { private: 0x0488ade4, public: 0x0488b21e } },
    "ypub": { network: BitcoinNetwork.Main, scriptType: BitcoinScriptType.P2SH, config: { private: 0x049d7878, public: 0x049d7cb2 } },
    "yprv": { network: BitcoinNetwork.Main, scriptType: BitcoinScriptType.P2SH, config: { private: 0x049d7878, public: 0x049d7cb2 } },
    "zpub": { network: BitcoinNetwork.Main, scriptType: BitcoinScriptType.P2WPKH, config: { private: 0x04b2430c, public: 0x04b24746 } },
    "zprv": { network: BitcoinNetwork.Main, scriptType: BitcoinScriptType.P2WPKH, config: { private: 0x04b2430c, public: 0x04b24746 } },
    "tpub": { network: BitcoinNetwork.Test, scriptType: BitcoinScriptType.P2PKH, config: { private: 0x04358394, public: 0x043587cf } },
    "tprv": { network: BitcoinNetwork.Test, scriptType: BitcoinScriptType.P2PKH, config: { private: 0x04358394, public: 0x043587cf } },
    "upub": { network: BitcoinNetwork.Test, scriptType: BitcoinScriptType.P2SH, config: { private: 0x044a4e28, public: 0x044a5262 } },
    "uprv": { network: BitcoinNetwork.Test, scriptType: BitcoinScriptType.P2SH, config: { private: 0x044a4e28, public: 0x044a5262 } },
    "vpub": { network: BitcoinNetwork.Test, scriptType: BitcoinScriptType.P2WPKH, config: { private: 0x045f18bc, public: 0x045f1cf6 } },
    "vprv": { network: BitcoinNetwork.Test, scriptType: BitcoinScriptType.P2WPKH, config: { private: 0x045f18bc, public: 0x045f1cf6 } },
}



export const deteckNetworkAndScriptType = (extendedPubKey: string) => {

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
        result.push({ address: caculateBitcoinAddress(childNode.publicKey, network, scriptType), path: `m/${changeIndex}/${i}`, pubkey: childNode.publicKey })
    }
    return result
}

const genreateAddresses = (type: number) => (extendedPubKey: string, fromIndex = 0, toIndex = 10) => {
    const { network, scriptType } = deteckNetworkAndScriptType(extendedPubKey);
    let networkConfig;
    if (network === BitcoinNetwork.Main) {
        networkConfig = networks.bitcoin
    } else {
        networkConfig = networks.testnet
    }
    const node = bip32.fromBase58(extendedPubKey, networkConfig);

    return batchGenerateAddreses(type)(node, network, scriptType, fromIndex, toIndex)
}

export const generateReceiveAddress = genreateAddresses(0)
export const generateChangeAddress = genreateAddresses(1)


export const composePsbt = (traget: string, value: number, feeRate: number, utxos: Utxo[]): string => {

    const targetObj = [{
        address: traget,
        value: value,
    }]

    const utxoList = utxos.map((each) => {
        const formatedUxto: Record<string, any> = {
            txId: each.transactionHash,
            vout: each.index,
            value: each.value
        }
        if (each.rawHex) {
            formatedUxto["nonWitnessUtxo"] = Buffer.from(each.rawHex, 'hex')
        }

        return formatedUxto
    }

    )

    let { inputs, outputs, fee } = coinSelect(utxoList, targetObj, feeRate)
    return ""
}
