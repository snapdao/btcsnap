import { useEffect, useState } from 'react';

import { BitcoinNetwork } from '../interface';
import { BlockChair } from '../lib/explorer';
import { BACKENDAPI } from '../config';
import { TransactionStatus } from "../components/TransactionCard/types";

export const useTransaction = (network: BitcoinNetwork) => {
  const [txList, setTxList] = useState<
    {
      txId: string;
      blocknumber: string | undefined;
      status: TransactionStatus;
    }[]
  >([]);

  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);

  const refresh = () => setCount(count + 1);

  const addTxs = (txIds: string[]) => {
    const allPendingTxIds = txList.map(tx => tx.txId);
    const newTxIds = txIds.filter(newTxId => !allPendingTxIds.includes(newTxId))
    const newList = [
      ...txList,
      ...newTxIds.map((txId) => ({
          txId,
          blocknumber: undefined,
          status: TransactionStatus.PENDING,
        })
      )
    ]
    setTxList(newList);
    refresh();
  };

  useEffect(() => {
    setLoading(true);
    const apiKey = BACKENDAPI;
    const explorer = new BlockChair(apiKey, network);
    Promise.all(txList.map((each) => explorer.checkTxStatus(each.txId))).then(
      (data) => {
        const result = data.map((each) => ({
          txId: each.txId,
          blocknumber: each.blockId,
          status: each.blockId ? TransactionStatus.CONFIRMED : TransactionStatus.PENDING,
        }));
        setTimeout(() => {
          setLoading(false);
        },1000)
        setTxList(result);
      },
    );
  }, [network, count]);

  return {
    txList,
    refresh,
    addTxs,
    loading
  };
};
