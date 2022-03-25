import { count } from "console";
import { useState, useEffect } from "react";
import { Address, BitcoinNetwork, Utxo } from "../interface";
import { generateReceiveAddress, generateChangeAddress } from "../lib";
import { BlockChair } from '../lib/explorer'

export const useExtendedPubKey = (extendedPubKey: string, network: BitcoinNetwork) => {
    const [pubKey, setPubKey] = useState(extendedPubKey)
    const [count, setCount] = useState(0)
    const [utxoList, setUTXOList] = useState<Utxo[]>([])
    const [recieveAddressList, setRecieveList] = useState<Address[]>([]);
    const [changeAddressList, setChangeList] = useState<Address[]>([]);

    const refresh = () => {
        setCount(count + 1)
    }

    useEffect(() => {
        if (pubKey.length > 0) {
            const apiKey = "A___VmKhrQNcUYF3Q0DJZB5VWlHGS2Dt"
            const explorer = new BlockChair(apiKey, network)
            explorer.getStatus(pubKey, true).then(data => {
                setUTXOList(data.utxos)
                setRecieveList(generateReceiveAddress(pubKey, 0, data.recieveMax + 1))
                setChangeList(generateChangeAddress(pubKey, 0, data.changeMax + 1))
            })
        }

    }, [pubKey, count])

    return { utxoList, recieveAddressList, changeAddressList, setPubKey, refresh}

}