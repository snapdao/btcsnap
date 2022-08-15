import { useState, useEffect } from 'react';
import { Address, Utxo } from '../interface';
import { generateReceiveAddress, generateChangeAddress } from '../lib';
import { BlockChair } from '../lib/explorer';
import { BACKENDAPI } from '../config';
import { useKeystoneStore } from "../mobx";

export const useExtendedPubKey = () => {
  const { global: { bip44Xpub: pubKey, network } } = useKeystoneStore();
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);

  const [utxoList, setUTXOList] = useState<Utxo[]>([]);
  const [receiveAddressList, setReceiveAddressList] = useState<Address[]>([]);
  const [changeAddressList, setChangeList] = useState<Address[]>([]);

  const refresh = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    if (pubKey.length > 0) {
      const apiKey = BACKENDAPI;
      const explorer = new BlockChair(apiKey, network);
      setLoading(true);
      setUTXOList([]);
      setReceiveAddressList([]);
      setChangeList([]);

      explorer
        .getStatus(pubKey, true)
        .then((data) => {
          setLoading(false);
          setUTXOList(data.utxos);
          setReceiveAddressList(
            generateReceiveAddress(pubKey, 0, data.recieveMax + 1),
          );
          setChangeList(generateChangeAddress(pubKey, 0, data.changeMax + 1));
        })
        .catch((e) => {
          console.error(e);
          setLoading(false);
        });
    }
  }, [pubKey, count, network]);

  return {
    utxoList,
    receiveAddressList,
    changeAddressList,
    refresh,
    loading,
  };
};
