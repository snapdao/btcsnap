import { useEffect, useState } from "react";
import { querySendInfo } from "../api/v1/sendInfo";
import { fetchTransaction } from "../api/v1/fetchTransaction";
import { BitcoinNetworkCode } from '../constant/supportedCoins'
import { fromHdPathToObj } from "../lib/cryptoPath";
import { coinManager } from "../services/CoinManager";
import { BitcoinScriptType, Utxo, BitcoinNetwork } from "../interface";
import { useKeystoneStore } from "../mobx";
import { autoAction } from "mobx/dist/internal";

interface CountedUtxo extends Utxo {
  count: number;
}

export const useUtxo = () => {
  const {current} = useKeystoneStore();
  const [utxoList, setUtxoList] = useState<Utxo[]>([]);
  const [nextChange, setNextChange] = useState<number>(0);

  useEffect(() => {
    if (current) {
      querySendInfo(current.coinCode).then(data => {
        const utxoList = data.spendables
          .map(utxo => {
            const {change, index} = fromHdPathToObj(utxo.hdPath);
            const pubkey = coinManager.xpubToPubkey(current.xpub, Number(change), Number(index));
            return {
              transactionHash: utxo.txid,
              index: utxo.voutN,
              address: coinManager.deriveAddress(pubkey, current.scriptType, current.network),
              value: utxo.value,
              path: `m/${change}/${index}`,
              pubkey,
            }
          })
        return {utxoList, nextChange: data.unusedChangeAddressHdPath}
      }).then(data => {
        return fetchRawTx(data['utxoList'], data['nextChange'], current.network, current.scriptType)
      })
      .then(data => {
        const {utxoList, nextChange} = data
        setUtxoList(utxoList);
        const {index} = fromHdPathToObj(nextChange);
        setNextChange(Number(index || 0));
      })
      .catch(e => {
        console.error("Fetch utxo list failed", e);
      })
    }
  }, [current])
  
  return {
    utxoList,
    nextChange
  }
}


const fetchRawTx = (utxoList:any[], nextChange: string, network: BitcoinNetwork, scriptType: BitcoinScriptType) => {
  if (scriptType == BitcoinScriptType.P2PKH) {
    let networkCode = BitcoinNetworkCode.Test;
    return Promise.all(utxoList.map(each => {
      if (network == BitcoinNetwork.Main) {
        networkCode = BitcoinNetworkCode.Main;
      }
      return fetchTransaction(networkCode, each.transactionHash).then(
        data => ({
          ...each,
          rawHex: data
        })
      )
    })).then(newUtxoList => {
      return {
        utxoList: newUtxoList,
        nextChange
      }
    })
  } else {
    return {
      utxoList,
      nextChange
    }
  }
}


