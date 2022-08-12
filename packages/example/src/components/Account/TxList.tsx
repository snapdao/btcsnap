import React from "react";
import TransactionCard, { TxDetailCardProps } from "../TransactionCard";
import { TransactionStatus, TransactionType } from "../TransactionCard/types";
import Transactions from "./image/transactions.svg";

// TODO specific type, transform tx data
interface TxCardProps {
  txList: any[];
}

const mockTxData: TxDetailCardProps[] = [
  {ID: "38e456e9be582195e784e820b8931f0fcf15d7eebcf093b17201f844e566c4c9", type: TransactionType.SEND, amount: '0.001', status: TransactionStatus.PENDING, address: "fakeBitcoinAddress", date: "07-20 16:00"},
  {ID: "txHash2", type: TransactionType.RECEIVE, amount: '0.001', status: TransactionStatus.PENDING, address: "fakeBitcoinAddress", date: "07-20 16:00"},
  {ID: "txHash3", type: TransactionType.SEND, amount: '0.001', status: TransactionStatus.DONE, address: "fakeBitcoinAddress", date: "07-20 16:00"},
  {ID: "txHash4", type: TransactionType.RECEIVE, amount: '0.001', status: TransactionStatus.DONE, address: "fakeBitcoinAddress", date: "07-20 16:00"},
  {ID: "txHash5", type: TransactionType.SEND, amount: '0.001', status: TransactionStatus.DONE, address: "fakeBitcoinAddress", date: "07-20 16:00"},
  {ID: "txHash6", type: TransactionType.SEND, amount: '0.001', status: TransactionStatus.DONE, address: "fakeBitcoinAddress", date: "07-20 16:00"},
  {ID: "txHash7", type: TransactionType.SEND, amount: '0.001', status: TransactionStatus.DONE, address: "fakeBitcoinAddress", date: "07-20 16:00"},
]

const TxList = ({txList}: TxCardProps) => (
  <div className="Tx-list-container">
    {
      txList.length > 0 ? (
        <div className="Tx-list-content">
          {txList.map(tx => <TransactionCard {...tx} />)}
        </div>
      ) : (
        <div className="Tx-list-empty">
          <img src={Transactions} alt="transactions"/>
          <p className="Empty-tip">No Transactions</p>
        </div>
      )
    }
  </div>
)

export default TxList;