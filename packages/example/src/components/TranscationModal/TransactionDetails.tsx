import { TransitionablePortal, Modal } from "semantic-ui-react";
import CloseIcon from "../Icons/CloseIcon";
import SendIcon from "../Icons/SendIcon";
import ReceiveIcon from "../Icons/ReceiveIcon";
import SuccessIcon from "../Icons/SuccessIcon";
import FailedIcon from "../Icons/FailedIcon";
import PendingImage from "./image/pend.png";
import { TransactionTypes, TransactionStatus, TransactionDetail } from "./types";
import { getTransactionLink } from "../../lib/explorer";
import { BitcoinNetwork } from "../../interface";
import {
  ModalHeaderCenter,
  ModalHeaderContainer,
  ModalHeaderLabel,
  TransactionDetailsTop,
  TransactionDetailsBottom,
  TransactionAmount,
  TransactionAmountIcon,
  TransactionAmountValue,
  TransactionDetailsLink,
  TransactionDetailsStatus,
  TransactionDetailsFromTo,
  TransactionDetailsAmountFee,
  FailedText,
  BackgroundDiv,
  LoadingIconContainer
} from "./styles"

interface TransactionProps {
  network: BitcoinNetwork;
  open: boolean;
  close: () => void;
  details: TransactionDetail;
}

const TransactionDetails = (({network, open, close, details}:TransactionProps) => {
  const isFailed = details.status === TransactionStatus.Failed;
  const isPending = details.status === TransactionStatus.Pending;
  const isSendType = details.type === TransactionTypes.Send;
  let Icon;

  switch(details.status) {
    case TransactionStatus.Confirmed:
      Icon = <SuccessIcon />;
      break;
    case TransactionStatus.Pending:
      Icon = <img width="36" height="36" src={PendingImage}/>;
      break;
    case TransactionStatus.Failed:
      Icon = <FailedIcon />;
      break;
  }

  return (
    <TransitionablePortal
      open={open}
      transition={{ animation: 'fade up', duration: '300' }}
    >
      <Modal
        open={true}
        style={{width: 440, height: 612,marginTop: 28, borderRadius: 20}}
      >
        <TransactionDetailsTop>
          <ModalHeaderCenter>
            <div></div>
            <ModalHeaderContainer>
              <ModalHeaderLabel>{details.type}</ModalHeaderLabel>
            </ModalHeaderContainer>
            <CloseIcon onClick={close} />
          </ModalHeaderCenter>

          <TransactionAmount>
            <TransactionAmountIcon isSendType={isSendType}>
              { isSendType ? (<SendIcon size={36} />) : (<ReceiveIcon size={36} />)}
              { Icon }
              <BackgroundDiv></BackgroundDiv>
            </TransactionAmountIcon>

            <TransactionAmountValue>
              <span>{details.amount}</span>
              <span>BTC</span>
            </TransactionAmountValue>
          </TransactionAmount>

        </TransactionDetailsTop>

        <TransactionDetailsBottom>
          <TransactionDetailsStatus>
            <span>status</span>
            <span>{details.status}</span>
          </TransactionDetailsStatus>

          {isFailed && <FailedText>Reason for the failed transaction will be displayed here</FailedText>}

          <TransactionDetailsFromTo>
            <div>
              <span>From</span>
              <span>{details.address}</span>
            </div>
            <div>
              <span>To</span>
              <span>{details.address}</span>
            </div>
          </TransactionDetailsFromTo>

          <TransactionDetailsAmountFee>
            <div>
              <span>Amount</span>
              <span><span>{details.amount}</span><span>BTC</span></span>
            </div>
            {!isFailed && (
              <div>
                <span>Fee</span>
                <span><span>0.000358</span><span>BTC</span></span>
              </div>
            )}
          </TransactionDetailsAmountFee>
        </TransactionDetailsBottom>

        <TransactionDetailsLink>
          <a
            href={getTransactionLink(details.ID, network)}
            target="_blank"
            rel="noopener
            noreferrer"
          >
            View on {isPending && 'Memery Pool'} Explorer
          </a>
        </TransactionDetailsLink>
      </Modal>
    </TransitionablePortal>
  )
})

export default TransactionDetails
