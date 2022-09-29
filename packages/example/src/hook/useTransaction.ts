import { useEffect, useState } from 'react';
import { TransactionDetail, TransactionStatus, TransactionTypes } from "../components/TransactionList/types";
import { ActivityStatus, queryActivities } from "../api/v1/activities";
import { useKeystoneStore } from "../mobx";
import { satoshiToBTC } from "../lib/helper";

interface UseTransaction {
  size: number;
  offset?: number;
}

export const useTransaction = ({size, offset}: UseTransaction) => {
  const { current } = useKeystoneStore();
  const [txList, setTxList] = useState<TransactionDetail[]>([])
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [lastTx, setLastTx] = useState<number | undefined>(offset);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const refresh = () => {
    if(!loading) {
      setCount(count + 1);
    }
  }

  const loadMore = () => {
    setLastTx(txList[txList.length - 1].marker);
  }

  useEffect(() => {
    if (current) {
      setLoading(true);
      queryActivities({coin: current.coinCode, count: size, loadMoreTxs: lastTx})
        .then(res =>
          res.activities.map(tx => {
            const isReceive = tx.action === "recv_external";
            return {
              ID: tx.txid,
              type: isReceive ? TransactionTypes.Receive : TransactionTypes.Send,
              status: tx.status === ActivityStatus.Complete ? TransactionStatus.Confirmed : TransactionStatus.Pending,
              amount: satoshiToBTC(Math.abs(tx.amount)),
              address: (isReceive ? tx.senderAddresses?.[0] : tx.receiverAddresses?.[0]?.[0]) || "",
              date: tx.createdTime * 1000,
              fee: tx.fee,
              url: tx.explorerUrl,
              from: tx.senderAddresses?.[0] || "",
              to: tx.receiverAddresses?.[0]?.[0] || "",
              marker: tx.modifiedTime,
              confirmedNum: tx.confirmedNum,
              confirmThreshold: tx.confirmThreshold,
            }
          })
        )
        .then((txList) => {
          setTxList(txList);
          setLoading(false);
          setHasMore(txList.length !== 0);
        })
        .catch(e => {
          setLoading(false);
          console.error("Fetch transactions failed", e)
        })
    } else {
      setTxList([]);
    }
  }, [current, count, lastTx])

  return {
    txList,
    loading,
    refresh,
    loadMore,
    hasMore
  };
};
