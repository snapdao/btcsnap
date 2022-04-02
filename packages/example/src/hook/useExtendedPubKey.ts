import { useState, useEffect } from 'react';
import { Address, BitcoinNetwork, Utxo } from '../interface';
import { generateReceiveAddress, generateChangeAddress } from '../lib';
import { BlockChair } from '../lib/explorer';
import { BACKENDAPI } from '../config'

export const useExtendedPubKey = (
  extendedPubKey: string,
  network: BitcoinNetwork,
) => {
  const [pubKey, setPubKey] = useState(extendedPubKey);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  
  const [utxoList, setUTXOList] = useState<Utxo[]>([]);
  const [recieveAddressList, setRecieveList] = useState<Address[]>([]);
  const [changeAddressList, setChangeList] = useState<Address[]>([]);

  const refresh = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    if (pubKey.length > 0) {
      const apiKey = BACKENDAPI;
      const explorer = new BlockChair(apiKey, network);
      setLoading(true);
      explorer.getStatus(pubKey, true).then((data) => {
        setLoading(false);
        setUTXOList(data.utxos);
        setRecieveList(generateReceiveAddress(pubKey, 0, data.recieveMax + 1));
        setChangeList(generateChangeAddress(pubKey, 0, data.changeMax + 1));
      }).catch(e => {
        console.error(e)
        setLoading(false);
      });
    }
  }, [pubKey, count]);

  return {
    utxoList,
    recieveAddressList,
    changeAddressList,
    setPubKey,
    refresh,
    loading,
  };
};
