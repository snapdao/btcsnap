import { useEffect, useState } from 'react';
import { querySendInfo } from '../api/v1/sendInfo';
import { fetchTransaction } from '../api/v1/fetchTransaction';
import { BitcoinNetworkCode } from '../constant/supportedCoins';
import { fromHdPathToObj } from '../lib/cryptoPath';
import { coinManager } from '../services/CoinManager';
import { BitcoinNetwork, Utxo } from '../interface';
import { useKeystoneStore } from '../mobx';

export const useUtxo = () => {
  const {current} = useKeystoneStore();
  const [utxoList, setUtxoList] = useState<Utxo[]>([]);
  const [nextChangePath, setNextChangePath] = useState<string>("");

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
              path: utxo.hdPath,
              pubkey,
            }
          })
        return {utxoList, nextChange: data.unusedChangeAddressHdPath}
      }).then(data => {
        return fetchRawTx(data['utxoList'], data['nextChange'], current.network)
      })
      .then(data => {
        const {utxoList, nextChange} = data
        setUtxoList(utxoList);
        setNextChangePath(nextChange);
      })
      .catch(e => {
        console.error("Fetch utxo list failed", e);
      })
    }
  }, [current])
  
  return {
    utxoList,
    nextChange: nextChangePath
  }
}

const fetchRawTx = (utxoList: any[], nextChange: string, network: BitcoinNetwork) =>
  Promise.all(utxoList.map(each => {
    const networkCode = network == BitcoinNetwork.Main ? BitcoinNetworkCode.Main : BitcoinNetworkCode.Test;
    return fetchTransaction(networkCode, each.transactionHash).then(
      data => ({
        ...each,
        rawHex: data,
      }),
    );
  })).then(newUtxoList => {
    return {
      utxoList: newUtxoList,
      nextChange,
    };
  });
