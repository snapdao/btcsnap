import React from "react";
import { TransactionDetail, TransactionStatus, TransactionType } from "./types";
import SendIcon from "./image/send.svg"
import ReceiveIcon from "./image/receive.svg"
import PendingIcon from "./image/pending.png"
import "./index.css"

const formatDate = (date: number) => {
  const txDate = new Date(date);
  const addLeadingZero = (str:number| string) => str.toString().length === 2 ? str : `0${str}`
  return `${addLeadingZero(txDate.getMonth() + 1)}-${addLeadingZero(txDate.getDate())} ${addLeadingZero(txDate.getHours())}:${addLeadingZero(txDate.getMinutes())}`
}

const TransactionCard = ({ID, type, status, amount, address, date}: TransactionDetail) => {
  const isSendingTx = type === TransactionType.SEND;
  const isTxPending = status === TransactionStatus.PENDING;
  const addressDisplayed = `${address.substring(0, 6)}...${address.substring(address.length - 6)}`;

  // TODO, links support on mainnet and testnet, status as pending or confirmed.
  return (
    <div className="Tx-container">
      <a href={`https://www.blockchain.com/btc-testnet/tx/${ID}`} target="_blank" rel="noopener noreferrer">
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
