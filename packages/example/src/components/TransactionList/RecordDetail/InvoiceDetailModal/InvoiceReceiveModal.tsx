import React, { ReactNode, useEffect, useState } from 'react';
import {
  BottomButtonContainer, BottomGradientLayerContainer,
  FixedBottomContainer,
  LightningMark,
  RecordAmount,
  RecordStatus,
  RecordStatusContainer,
  RecordType
} from './styles';
import { InvoiceDetail, InvoiceStatus } from '../../../../types';
import PendingIcon from '../image/pend.png';
import { ReactComponent as ExpiredIcon } from '../image/expired_big.svg';
import { Modal, Popup } from '../../../../kits';
import { H3 } from '../../../../kits/Layout/Text/Title';
import { Icon } from 'snapkit';
import { Caption } from '../../../../kits/Layout/Text/Body';
import { useAppStore } from '../../../../mobx';
import { LightningIcon2 } from '../../../Icons/LightningIcon2';
import {
  GradientLayer,
  ModalTitleContainer,
  OneLineRecordItemContent,
  PrimaryButton,
  RecordDetailsBottom,
  RecordDetailsContainer,
  RecordDetailsContent,
  RecordDetailsTop,
  RecordItemContent,
  RecordItemLabel,
  RecordItemRow,
  RecordItemRowDivider
} from '../styles';
import dayjs from 'dayjs';
import SuccessIcon from '../../../Icons/SuccessIcon';
import LightningReceiveInvoiceModal from '../../../Lightning/ReceiveModal/Invoice';
import ReceiveViewModel from '../../../Lightning/ReceiveModal/model';
import { observer } from 'mobx-react-lite';
import { TransactionProps } from './index';
import useCountDown from '../../../../utils/hooks/useCountdown';
import lightningPayReq from 'bolt11';
import { addLeadingZero } from '../../../../utils/datetime';
import { BitcoinUnit } from '../../../../interface';
import { satoshiToBTC } from '../../../../lib/helper';
import BigNumber from 'bignumber.js';

export const getInvoiceStatusIcon = (
  status: InvoiceStatus,
): ReactNode => {
  switch (status) {
    case InvoiceStatus.Expired:
      return <ExpiredIcon/>;
    case InvoiceStatus.Pending:
      return <img alt={'pending'} src={PendingIcon}/>;
    case InvoiceStatus.Succeed:
      return <SuccessIcon/>;
  }
  return null;
};

const getExpiredSeconds = (invoice: InvoiceDetail): number => {
  if(invoice.status !== InvoiceStatus.Pending || !invoice.paymentRequest){
    return 0;
  }
  const decodedInvoice = lightningPayReq.decode(invoice.paymentRequest);
  const expireDateTime = new Date((decodedInvoice?.timeExpireDate || 0) * 1000);
  return expireDateTime.getTime() - new Date().getTime();
};

export const InvoiceReceiveModal = observer((({ open, close, invoice, parent }: TransactionProps) => {
  const { lightning, runtime: { currencyRate }, currentUnit } = useAppStore();
  const [showInvoiceDetails, setShowInvoiceDetails] = useState<boolean>(false);
  const [invoiceModal, setInvoiceModal] = useState<ReceiveViewModel | null>(null);
  const [timeLeft, { start, pause }] = useCountDown({ startTimeMilliseconds: getExpiredSeconds(invoice) });

  useEffect(() => {
    if(invoice.status === InvoiceStatus.Pending){
      start();
    }
    return () => {
      pause();
    };
  }, []);

  useEffect(() => {
    if (showInvoiceDetails) {
      const model = new ReceiveViewModel(lightning.current!.unit, currencyRate);
      model.updateCreatedInvoice(invoice.paymentRequest as string);
      setInvoiceModal(model);
    } else {
      setInvoiceModal(null);
    }
  }, [showInvoiceDetails]);
  
  const amountText = currentUnit === BitcoinUnit.BTC ? BigNumber(satoshiToBTC(invoice.amount)).toFixed()
    : invoice.amount;

  return (
    <Modal open={open} close={close} mountNode={parent}>
      <Modal.Header bannerMode onClose={close}>
        <ModalTitleContainer>
          <H3>
            {
              invoice.status === InvoiceStatus.Pending
                ? 'To Be Received'
                : invoice.status === InvoiceStatus.Expired
                  ? InvoiceStatus.Expired
                  : 'Received'
            }
          </H3>
        </ModalTitleContainer>
      </Modal.Header>

      <RecordDetailsContainer>
        <RecordDetailsContent>
          <RecordDetailsTop>
            <RecordStatusContainer>
              <RecordType>
                <Icon.Receive width={'36'} height={'36'} color={'#21A35D'}/>
                <RecordStatus>
                  {getInvoiceStatusIcon(invoice.status)}
                </RecordStatus>
              </RecordType>

              <RecordAmount
                lowlight={invoice.status !== InvoiceStatus.Succeed}
              >
                <span>{amountText}</span>
                <span>{currentUnit}</span>
              </RecordAmount>
            </RecordStatusContainer>

            <LightningMark>
              <LightningIcon2/>
              <Caption>Lighting Invoice</Caption>
            </LightningMark>
          </RecordDetailsTop>

          <RecordDetailsBottom moreSpacing={invoice.status === InvoiceStatus.Pending}>
            <RecordItemRow>
              <RecordItemLabel>Status</RecordItemLabel>
              <RecordItemLabel
                succeed={invoice.status === InvoiceStatus.Succeed}
              >
                {invoice.status === InvoiceStatus.Succeed && 'Success'}
                {invoice.status === InvoiceStatus.Pending && (
                  <>
                    Unpaid{' '}
                    <RecordItemContent>{`${addLeadingZero(timeLeft.hours)}:${addLeadingZero(timeLeft.minutes)}:${addLeadingZero(timeLeft.seconds)}`}</RecordItemContent>
                  </>
                )}
                {invoice.status === InvoiceStatus.Expired && 'Unpaid and Expired'}
              </RecordItemLabel>
            </RecordItemRow>

            <RecordItemRow>
              <RecordItemLabel>Invoice Create Time</RecordItemLabel>
              <RecordItemContent>{dayjs(invoice.date).format('YYYY-MM-DD HH:mm:ss')}</RecordItemContent>
            </RecordItemRow>

            <RecordItemRowDivider/>

            {
              invoice.status === InvoiceStatus.Succeed && (
                <RecordItemRow>
                  <RecordItemLabel>From</RecordItemLabel>
                  <Popup
                    breakLine
                    wide={'very'}
                    content={invoice.paymentRequest}
                    trigger={<OneLineRecordItemContent>{invoice.paymentRequest}</OneLineRecordItemContent>}
                  />
                </RecordItemRow>
              )
            }

            <RecordItemRow>
              <RecordItemLabel>To</RecordItemLabel>
              <Popup
                content={lightning.current?.name}
                trigger={<OneLineRecordItemContent>{lightning.current?.name}</OneLineRecordItemContent>}
              />
            </RecordItemRow>

            <RecordItemRowDivider/>

            <RecordItemRow>
              <RecordItemLabel>Amount</RecordItemLabel>
              <span>
                <RecordItemContent lowlight={invoice.status !== InvoiceStatus.Succeed}>
                  {amountText}{' '}
                </RecordItemContent>
                <RecordItemContent highlight>{currentUnit}</RecordItemContent>
              </span>
            </RecordItemRow>

            {
              invoice.description && (
                <>
                  <RecordItemRowDivider/>
                  <RecordItemLabel style={{ margin: '20px 0 8px' }}>Description</RecordItemLabel>
                  <RecordItemContent
                    style={{ marginBottom: 20 }}
                    wordBreak={invoice.description.split(' ').some(word => word.length > 30)}
                  >
                    {invoice.description}
                  </RecordItemContent>
                </>
              )
            }
          </RecordDetailsBottom>
          {
            invoice.status === InvoiceStatus.Pending && (
              <FixedBottomContainer>
                <GradientLayer />
                <BottomButtonContainer>
                  <PrimaryButton
                    primary
                    onClick={() => {
                      setShowInvoiceDetails(true);
                    }}
                  >
                    View Invoice
                  </PrimaryButton>
                </BottomButtonContainer>
              </FixedBottomContainer>
            )
          }
        </RecordDetailsContent>
      </RecordDetailsContainer>

      {
        showInvoiceDetails && invoiceModal && (
          <LightningReceiveInvoiceModal model={invoiceModal} close={() => {
            setShowInvoiceDetails(false);
          }}/>
        )
      }
      {
        invoice.status !== InvoiceStatus.Pending && (
          <BottomGradientLayerContainer>
            <GradientLayer />
          </BottomGradientLayerContainer>
        )
      }
    </Modal>
  );
}));
