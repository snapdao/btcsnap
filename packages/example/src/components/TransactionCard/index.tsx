import React from "react";
import { TransactionDetail, TransactionStatus, TransactionType } from "./types";
import SendIcon from "../Icons/SendIcon";
import { ReactComponent as ReceiveIcon } from "./image/receive.svg"
import PendingIcon from "./image/pending.png"
import "./index.css"
import { BlockChair } from "../../lib/explorer";
import { BitcoinNetwork } from "../../interface";

const formatDate = (date: number) => {
  const txDate = new Date(date);
  const addLeadingZero = (str:number| string) => str.toString().length === 2 ? str : `0${str}`
  return `${addLeadingZero(txDate.getMonth() + 1)}-${addLeadingZero(txDate.getDate())} ${addLeadingZero(txDate.getHours())}:${addLeadingZero(txDate.getMinutes())}`
}

interface TransactionCardProps extends TransactionDetail {
  network: BitcoinNetwork
}

const TransactionCard = ({ID, type, status, amount, address, date, network}: TransactionCardProps) => {
  const isSendingTx = type === TransactionType.SEND;
  const isTxPending = status === TransactionStatus.PENDING;
  const addressDisplayed = `${address.substring(0, 6)}...${address.substring(address.length - 6)}`;

  return (
    <div className="Tx-container">
      <a href={BlockChair.getTransactionLink(ID, network)} target="_blank" rel="noopener noreferrer">
        <div className="Tx-detail-container">
          <div className="Tx-detail-img-container">
            { isSendingTx ? <SendIcon size={24} /> : <ReceiveIcon /> }
            { isTxPending && <img className="pending" src={PendingIcon} alt="pending"/> }
          </div>
          <div className="Tx-content-container">
            <div className="Tx-main">
              <span className="type">{type}</span>
              <span className={isSendingTx ? "highlight" : ""}>{`${isSendingTx ? "-" : "+"}${amount}`}</span>
            </div>
            <div className="Tx-secondary">
              <span className="Tx-address">
                <span>{isSendingTx ? "To" : "From"}:</span>
                <span className="highlight">{addressDisplayed}</span>
              </span>
              <span>{formatDate(date)}</span>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default TransactionCard;
