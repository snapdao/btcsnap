import React from "react";
import TransactionCard  from "../TransactionCard";
import { TransactionDetail } from "../TransactionCard/types";
import Transactions from "./image/transactions.svg";
import { observer } from "mobx-react-lite";

// TODO transform tx data
interface TxCardProps {
  txList: TransactionDetail[];
}

const TxList = observer(({txList}: TxCardProps) => (
  <div className="Tx-list-container">
    {
      txList.length > 0 ? (
        <div className="Tx-list-content">
          {txList.map(tx => <TransactionCard key={tx.ID} {...tx} />)}
        </div>
      ) : (
        <div className="Tx-list-empty">
          <img src={Transactions} alt="transactions"/>
          <p className="Empty-tip">No Transactions</p>
        </div>
      )
    }
  </div>
))

export default TxList;