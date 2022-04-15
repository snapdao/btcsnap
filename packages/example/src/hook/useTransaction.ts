import { useState, useEffect } from 'react';

import { BitcoinNetwork } from '../interface';
import { BlockChair } from '../lib/explorer';
import { BACKENDAPI } from '../config';

export const useTransaction = (network: BitcoinNetwork) => {
  const [txList, setTxList] = useState<
    {
      txId: string;
      blocknumber: string | undefined;
      status: string;
    }[]
  >([]);

  const [count, setCount] = useState(0);

  const refresh = () => setCount(count + 1);

  const addTx = (txId: string) => {
    txList.push({
      txId,
      blocknumber: undefined,
      status: 'unconfirmed',
    });
    setTxList(txList);
    refresh();
  };

  useEffect(() => {
    const apiKey = BACKENDAPI;
    const explorer = new BlockChair(apiKey, network);
    Promise.all(txList.map((each) => explorer.checkTxStatus(each.txId))).then(
      (data) => {
        const result = data.map((each) => ({
          txId: each.txId,
          blocknumber: each.blockId,
          status: each.blockId ? 'confirmed' : 'unconfirmed',
        }));

        setTxList(result);
      },
    );
  }, [network, count]);

  return {
    txList,
    refresh,
    addTx,
  };
};
