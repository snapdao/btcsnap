import React, { useEffect, useState } from 'react';
import Menu from "../Menu";
import TxList from "./TxList";
import RefreshIcon from "../Icons/RefreshIcon";
import { useKeystoneStore } from "../../mobx";
import { observer } from "mobx-react-lite";
import { useTransaction } from "../../hook/useTransaction";
import { AccountAside, AccountAsideContainer, AccountAsideRefresh } from "./styles"
import { ActivityStatus, queryActivities } from "../../api/v1/activities";
import { TransactionDetail, TransactionStatus, TransactionType } from "../TransactionCard/types";

const Aside = observer(({refreshBalance}: { refreshBalance: () => void }) => {
  const {current, settings: {network}} = useKeystoneStore()
  const [txList, setTxList] = useState<TransactionDetail[]>([]);
  const {refresh, loading} = useTransaction(network);

  useEffect(() => {
    if (current) {
      queryActivities({coin: current.coinCode, count: 5})
        .then(res =>
          res.activities.map(tx => {
            const isReceive = tx.action === "recv_external";
            return {
              ID: tx.txid,
              type: isReceive ? TransactionType.RECEIVE : TransactionType.SEND,
              status: tx.status === ActivityStatus.Complete ? TransactionStatus.CONFIRMED : TransactionStatus.PENDING,
              amount: Math.abs(tx.amount),
              address: (isReceive ? tx.senderAddresses?.[0] : tx.receiverAddresses?.[0][0]) || "",
              date: tx.createdTime,
            }
          })
        )
        .then(setTxList)
        .catch(e => {
          console.error("Fetch transactions failed", e)
        })
    } else {
      setTxList([]);
    }
  }, [network, current?.xpub])

  return (
    <AccountAside>
      <AccountAsideContainer>
        <Menu/>
        <TxList network={network} txList={txList}/>
        <AccountAsideRefresh>
          <RefreshIcon onClick={refresh} loading={loading}/>
        </AccountAsideRefresh>
      </AccountAsideContainer>
    </AccountAside>
  );
});

export default Aside;
