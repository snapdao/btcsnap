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

const TxList = observer(({txList, network}: TxCardProps) => (
  <div className="Tx-list-container">
    {
      txList.length > 0 ? (
        <div className="Tx-list-content">
          {txList.map(tx => <TransactionCard key={tx.ID} {...tx} network={network} />)}
        </div>
      ) : (
        <div className="Tx-list-empty">
          <Transactions />
          <p className="Empty-tip">No Transactions</p>
        </div>
      )
    }
  </div>
))

export default TxList;