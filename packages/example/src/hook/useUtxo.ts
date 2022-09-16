import { useEffect, useState } from "react";
import { querySendInfo } from "../api/v1/sendInfo";
import { fromHdPathToObj } from "../lib/cryptoPath";
import { coinManager } from "../services/CoinManager";
import { Utxo } from "../interface";
import { useKeystoneStore } from "../mobx";

interface CountedUtxo extends Utxo {
  count: number;
}

export const useUtxo = () => {
  const {current} = useKeystoneStore();
  const [utxoList, setUtxoList] = useState<CountedUtxo[]>([]);

  useEffect(() => {
    if (current) {
      querySendInfo(current.coinCode).then(data => {
        const utxoList = data.spendables
          .map(utxo => {
            const {change, index} = fromHdPathToObj(utxo.hdPath);
            const pubkey = coinManager.xpubToPubkey(current.xpub, Number(change || 0), Number(index || 0));
            return {
              transactionHash: utxo.txid,
              index: utxo.voutN,
              address: coinManager.deriveAddress(pubkey, current.scriptType, current.network),
              value: utxo.value,
              path: utxo.hdPath,
            }
          }).reduce((acc: CountedUtxo[], cur): CountedUtxo[] => {
            const itemIndex = acc.findIndex(item => item.path === cur.path);
            if (itemIndex > -1) {
              acc[itemIndex].count++;
              acc[itemIndex].value += cur.value;
              return acc;
            } else {
              return [...acc, {...cur, count: 1}]
            }
          }, [])
        setUtxoList(utxoList)
      }).catch(e => {
        console.error("Fetch utxo list failed", e);
      })
    }
  }, [current])
  
  return {
    utxoList
  }
}
