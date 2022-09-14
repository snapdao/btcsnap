import React from "react";
import TransactionCard  from "../TransactionCard";
import { TransactionDetail } from "../TransactionCard/types";
import { ReactComponent as Transactions } from "./image/transactions.svg";
import { observer } from "mobx-react-lite";
import { BitcoinNetwork } from "../../interface";
import { TxListContainer, TxListContent, TxListEmpty, EmptyTip } from "./styles"
import { useKeystoneStore } from "../../mobx";

interface TxCardProps {
  network: BitcoinNetwork
  txList: TransactionDetail[];
}

const TxList = observer(({txList, network}: TxCardProps) => {
  const { current } = useKeystoneStore();
  const transactions = [...txList];
  transactions.sort((tx1, tx2) => tx2.date - tx1.date);

  return (
    <TxListContainer>
      {
        current && transactions.length > 0 ? (
          <TxListContent>
            {transactions.map(tx => <TransactionCard key={tx.ID} {...tx} network={network} />)}
          </TxListContent>
        ) : (
          <TxListEmpty>
            <Transactions />
            <EmptyTip>No Transactions</EmptyTip>
          </TxListEmpty>
        )
      }
    </TxListContainer>
  )
})

export default TxList;