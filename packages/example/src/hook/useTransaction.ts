import { useEffect, useState } from 'react';
import { TransactionDetail, TransactionStatus, TransactionType } from "../components/TransactionCard/types";
import { ActivityStatus, queryActivities } from "../api/v1/activities";
import { useKeystoneStore } from "../mobx";
import { satoshiToBTC } from "../lib/helper";

export const useTransaction = () => {
  const { current } = useKeystoneStore();
  const [txList, setTxList] = useState<TransactionDetail[]>([])
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);

  const refresh = () => {
    if(!loading) {
      setCount(count + 1);
    }
  }

  useEffect(() => {
    if (current) {
      setLoading(true);
      queryActivities({coin: current.coinCode, count: 5})
        .then(res =>
          res.activities.map(tx => {
            const isReceive = tx.action === "recv_external";
            return {
              ID: tx.txid,
              type: isReceive ? TransactionType.RECEIVE : TransactionType.SEND,
              status: tx.status === ActivityStatus.Complete ? TransactionStatus.CONFIRMED : TransactionStatus.PENDING,
              amount: satoshiToBTC(Math.abs(tx.amount)),
              address: (isReceive ? tx.senderAddresses?.[0] : tx.receiverAddresses?.[0]?.[0]) || "",
              date: tx.createdTime * 1000,
              fee: tx.fee,
              url: tx.explorerUrl,
              from: tx.senderAddresses?.[0] || "",
              to: tx.receiverAddresses?.[0]?.[0] || ""
            }
          })
        )
        .then((txList) => {
          setTxList(txList)
          setLoading(false);
        })
        .catch(e => {
          setLoading(false);
          console.error("Fetch transactions failed", e)
        })
    } else {
      setTxList([]);
    }
  }, [current, count])

  return {
    txList,
    loading,
    refresh
  };
};
