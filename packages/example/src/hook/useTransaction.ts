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

export const useTransaction = ({ size, offset }: UseTransaction) => {
  const { current, currentWalletType } = useAppStore();
  const [txList, setTxList] = useState<TransactionDetail[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [lastTx, setLastTx] = useState<number | undefined>(offset);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [error, setError] = useState<string>();

  const refresh = () => {
    setError(undefined);
    if (!loading) {
      setCount(count + 1);
    }
  };

  const loadMore = () => {
    setLastTx(txList[txList.length - 1].marker);
  };

  useEffect(() => {
    if (current && currentWalletType === WalletType.BitcoinWallet) {
      setLoading(true);
      queryActivities({ coin: current.coinCode, count: size * 2, loadMoreTxs: lastTx })
        .then(res =>
          res.activities.map(tx => {
            const isReceive = tx.action === 'recv_external';
            return {
              ID: tx.txid,
              type: isReceive ? TransactionTypes.Received : TransactionTypes.Sent,
              status: tx.status === ActivityStatus.Complete ? TransactionStatus.Confirmed : TransactionStatus.Pending,
              amount: (isReceive ? Math.abs(tx.amount) : tx.receiverAddresses?.[0]?.[1]) || 0,
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
            .reduce((list, cur) => {
              if (list.some(tx => tx.ID === cur.ID)) {
                // filter out the transaction indicates receiving, which is actually the transaction sent to change address,
                // only keep the sending one for the same ID
                return [...list, cur].filter(tx => tx.ID !== cur.ID || tx.type !== TransactionTypes.Received);
              }
              return [...list, cur];
            }, [] as TransactionDetail[])
            .slice(0, size)
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
