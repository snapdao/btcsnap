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
        setUtxoList(utxoList);
        const {index} = fromHdPathToObj(data.unusedChangeAddressHdPath);
        setNextChange(Number(index || 0));
      }).catch(e => {
        console.error("Fetch utxo list failed", e);
      })
    }
  }, [current])
  
  return {
    utxoList,
    nextChange
  }
}
