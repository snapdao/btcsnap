import { useEffect, useState } from 'react';
import { TransactionDetail, TransactionStatus, TransactionTypes } from '../types';
import { ActivityStatus, queryActivities } from '../api/v1/activities';
import { useAppStore } from '../mobx';
import { logger } from '../logger';
import { WalletType } from '../interface';

interface UseTransaction {
  size: number;
  offset?: number;
}

export const useTransaction = ({size, offset}: UseTransaction) => {
  const { current, currentWalletType } = useAppStore();
  const [txList, setTxList] = useState<TransactionDetail[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [lastTx, setLastTx] = useState<number | undefined>(offset);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [error, setError] = useState<string>();

  const refresh = () => {
    setError(undefined);
    if(!loading) {
      setCount(count + 1);
    }
  };

  const loadMore = () => {
    setLastTx(txList[txList.length - 1].marker);
  };

  useEffect(() => {
    if (current && currentWalletType === WalletType.BitcoinWallet) {
      setLoading(true);
      queryActivities({coin: current.coinCode, count: size, loadMoreTxs: lastTx})
        .then(res =>
          res.activities.map(tx => {
            const isReceive = tx.action === 'recv_external';
            return {
              ID: tx.txid,
              type: isReceive ? TransactionTypes.Received : TransactionTypes.Sent,
              status: tx.status === ActivityStatus.Complete ? TransactionStatus.Confirmed : TransactionStatus.Pending,
              amount: Math.abs(tx.amount),
              address: (isReceive ? tx.senderAddresses?.[0] : tx.receiverAddresses?.[0]?.[0]) || '',
              date: tx.createdTime * 1000,
              fee: tx.fee,
              url: tx.explorerUrl,
              from: tx.senderAddresses?.[0] || '',
              to: tx.receiverAddresses?.[0]?.[0] || '',
              marker: tx.modifiedTime,
              confirmedNum: tx.confirmedNum,
              confirmThreshold: tx.confirmThreshold,
            };
          })
        )
        .then((txList: TransactionDetail[]) => {
          setTxList(txList);
          setLoading(false);
          setHasMore(txList.length !== 0);
        })
        .catch(e => {
          setLoading(false);
          setTxList([]);
          setError(e);
          logger.error(e);
        });
    } else {
      setTxList([]);
    }
  }, [current, count, lastTx, currentWalletType]);

  return {
    txList,
    loading,
    refresh,
    loadMore,
    hasMore,
    error
  };
};
