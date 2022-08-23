import React from "react";
import TransactionCard  from "../TransactionCard";
import { TransactionDetail } from "../TransactionCard/types";
import { ReactComponent as Transactions } from "./image/transactions.svg";
import { observer } from "mobx-react-lite";
import { BitcoinNetwork } from "../../interface";

interface TxCardProps {
  network: BitcoinNetwork
  txList: TransactionDetail[];
}

const TxList = observer(({txList, network}: TxCardProps) => {
  const transactions = [...txList];
  transactions.sort((tx1, tx2) => tx2.date - tx1.date);

  return (
    <div className="Tx-list-container">
      {
        transactions.length > 0 ? (
          <div className="Tx-list-content">
            {transactions.map(tx => <TransactionCard key={tx.ID} {...tx} network={network} />)}
          </div>
        ) : (
          <div className="Tx-list-empty">
            <Transactions />
            <p className="Empty-tip">No Transactions</p>
          </div>
        )
      }
    </div>
  )
})

export default TxList;