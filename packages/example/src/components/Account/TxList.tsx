import React, { useState } from "react";
import { TransactionType } from "snapkit";
import { ReactComponent as Transactions } from "./image/transactions.svg";
import { observer } from "mobx-react-lite";
import { BitcoinNetwork } from "../../interface";
import { TxListContainer, TxListContent, TxListEmpty, EmptyTip, TransactionItem } from "./styles";
import { useKeystoneStore } from "../../mobx";
import { TransactionTypes, TransactionDetail, TransactionStatus } from "../TransactionList/types";
import TransactionDetails from "../TransactionList/TransactionDetails";

interface TxCardProps {
  network: BitcoinNetwork
  txList: TransactionDetail[];
}

const TxList = observer(({txList, network}: TxCardProps) => {
  const [transactionDetailsItem, setTransactionDetailsItem] = useState<TransactionDetail | null>(null);
  const { current } = useKeystoneStore();
  const transactions = [...txList];
  transactions.sort((tx1, tx2) => tx2.date - tx1.date);
  const openTransactionItem = (tx:TransactionDetail) => {
    setTransactionDetailsItem(tx)
  }

  return (
    <TxListContainer>
      {
        current && transactions.length > 0 ? (
          <TxListContent>
            {transactions.map(tx =>
               <TransactionItem
                key={tx.ID}
                type={tx.type === TransactionTypes.Send ? TransactionType.SEND : TransactionType.RECEIVED}
                amount={tx.amount}
                address={tx.address}
                datetime={new Date(tx.date)}
                loading={tx.status === TransactionStatus.Pending}
                onClick={() => openTransactionItem(tx)}
              />
            )}

            {!!transactionDetailsItem &&
              <TransactionDetails
                network={network}
                open={!!transactionDetailsItem}
                close={() => setTransactionDetailsItem(null)}
                details={transactionDetailsItem}
              />
            }
          </TxListContent>
        ) : (
          <TxListEmpty>
            <Transactions />
            <EmptyTip>no transactions</EmptyTip>
          </TxListEmpty>
        )
      }
    </TxListContainer>
  )
})

export default TxList;