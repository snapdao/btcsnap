import React from "react";
import { TransactionStatus, TransactionType } from "./types";
import SendIcon from "./image/send.svg"
import ReceiveIcon from "./image/receive.svg"
import PendingIcon from "./image/pending.png"
import "./index.css"

export interface TxDetailCardProps {
  type: TransactionType;
  status: TransactionStatus;
  amount: number | string;
  address: string;
  date: string;
}

const TransactionCard = ({type, status, amount, address, date}: TxDetailCardProps) => {
  const isSendingTx = type === TransactionType.SEND;
  const isTxPending = status === TransactionStatus.PENDING;
  const addressDisplayed = `${address.substring(0, 6)}...${address.substring(address.length - 6)}`;
  
  return (
    <div className="Tx-container">
      <div className="Tx-detail-container">
        <div className="Tx-detail-img-container">
          <img src={isSendingTx ? SendIcon : ReceiveIcon} alt={type} />
          {
            isTxPending && <img className="pending" src={PendingIcon} alt="pending"/>
          }
        </div>
        <div className="Tx-content-container">
          <div className="Tx-main">
            <span className="type">{type}</span>
            <span className={isSendingTx ? "highlight" : ""}>{`${isSendingTx ? "-" : "+"}${amount}`}</span>
          </div>
          <div className="Tx-secondary">
            <span>
              <span>{isSendingTx ? "From" : "To"}:</span>
              <span className="highlight">{addressDisplayed}</span>
            </span>
            <span>{date}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;
