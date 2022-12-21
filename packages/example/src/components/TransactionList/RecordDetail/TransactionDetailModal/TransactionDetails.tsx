import { TransitionablePortal, Modal } from 'semantic-ui-react';
import CloseIcon from '../../../Icons/CloseIcon';
import SendIcon from '../../../Icons/SendIcon';
import ReceiveIcon from '../../../Icons/ReceiveIcon';
import SuccessIcon from '../../../Icons/SuccessIcon';
import FailedIcon from '../../../Icons/FailedIcon';
import PendingImage from '../image/pend.png';
import { TransactionTypes, TransactionStatus, TransactionDetail } from '../../../../types';
import { getTransactionDetailsLink } from '../../../../lib/explorer';
import { satoshiToBTC } from '../../../../lib/helper';
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
  PendingSpan,
  CompletedSpan,
} from './sytles';
import { useAppStore } from '../../../../mobx';
import { observer } from 'mobx-react-lite';
import { BitcoinUnit } from '../../../../interface';
import BigNumber from 'bignumber.js';
import { bitcoinUnitMap } from '../../../../lib/unit';

interface TransactionProps {
  open: boolean;
  close: () => void;
  details: TransactionDetail;
  parent?: HTMLElement
}

export const TransactionDetails = observer(({ open, close, details, parent }:TransactionProps) => {
  const { settings: { network }, currentUnit } = useAppStore();
  const isFailed = details.status === TransactionStatus.Failed;
  const isPending = details.status === TransactionStatus.Pending;
  const isSendType = details.type === TransactionTypes.Sent;
  const transactionFrom = `${details.from.slice(0, 8)}...${details.from.slice(-8)}`;
  const transactionTo = `${details.to.slice(0, 8)}...${details.to.slice(-8)}`;
  let Icon;

  switch(details.status) {
    case TransactionStatus.Confirmed:
      Icon = <SuccessIcon />;
      break;
    case TransactionStatus.Pending:
      Icon = <img width='36' height='36' src={PendingImage}/>;
      break;
    case TransactionStatus.Failed:
      Icon = <FailedIcon />;
      break;
  }

  const amountText = currentUnit === BitcoinUnit.BTC ? BigNumber(satoshiToBTC(details.amount)).toFixed()
    : details.amount;
  const feeText = details.fee || details.fee === 0 ? currentUnit === BitcoinUnit.BTC ? BigNumber(satoshiToBTC(details.fee)).toFixed()
    : details.fee : '--';
  const unitText = bitcoinUnitMap[network][currentUnit];

  return (
    <TransitionablePortal
      open={open}
      transition={{ animation: 'fade up', duration: '300' }}
    >
      <Modal
        open={true}
        mountNode={parent}
        style={{ width: 440, height: 612, marginTop: 28, borderRadius: 20 }}
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
              { isSendType ? <SendIcon size={36} /> : <ReceiveIcon size={36} />}
              { Icon }
              <BackgroundDiv></BackgroundDiv>
            </TransactionAmountIcon>

            <TransactionAmountValue>
              <span>{amountText}</span>
              <span>{unitText}</span>
            </TransactionAmountValue>
          </TransactionAmount>

        </TransactionDetailsTop>

        <TransactionDetailsBottom>
          <TransactionDetailsStatus>
            <span>status</span>
            {isPending ?
              <PendingSpan>{details.status} ({details.confirmedNum}/{details.confirmThreshold})</PendingSpan>
              : <CompletedSpan>{details.status}</CompletedSpan>
            }
          </TransactionDetailsStatus>

          {isFailed && <FailedText>Reason for the failed transaction will be displayed here</FailedText>}

          <TransactionDetailsFromTo>
            <div>
              <span>From</span>
              <span>{transactionFrom}</span>
            </div>
            <div>
              <span>To</span>
              <span>{transactionTo}</span>
            </div>
          </TransactionDetailsFromTo>

          <TransactionDetailsAmountFee>
            <div>
              <span>Amount</span>
              <span><span>{amountText}</span><span>{unitText}</span></span>
            </div>
            {!isFailed && (
              <div>
                <span>Fee</span>
                <span><span>{feeText}</span><span>{unitText}</span></span>
              </div>
            )}
          </TransactionDetailsAmountFee>
        </TransactionDetailsBottom>

        <TransactionDetailsLink>
          <a
            href={isPending ?  getTransactionDetailsLink(details.ID, network): details.url}
            target='_blank'
            rel='noopener
            noreferrer'
          >
            View on {isPending && 'Memory Pool'} Explorer
          </a>
        </TransactionDetailsLink>
      </Modal>
    </TransitionablePortal>
  );
});

export default TransactionDetails;
