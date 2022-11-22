import React, { ReactNode, useEffect, useState } from 'react';
import { LightningMark, ModalHeader, RecordAmount, RecordStatus, RecordStatusContainer, RecordType } from "./styles"
import SendIcon from "../../../Icons/SendIcon";
import ReceiveIcon from "../../../Icons/ReceiveIcon";
import { InvoiceDetail, InvoiceStatus, InvoiceTypes } from "../../../../types";
import { ReactComponent as OnChainIcon } from "../../../Lightning/InvoiceCard/images/onchain.svg";
import PendingIcon from "../../image/pend.png";
import { ReactComponent as ExpiredIcon } from "../../image/expired_big.svg";
import { Modal } from "../../../../kits";
import { H3 } from "../../../../kits/Layout/Text/Title";
import { Icon } from "snapkit";
import { Caption } from "../../../../kits/Layout/Text/Body";
import { useAppStore } from "../../../../mobx";
import { LightningIcon2 } from "../../../Icons/LightningIcon2";
import {
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
import dayjs from "dayjs";
import SuccessIcon from "../../../Icons/SuccessIcon";
import LightningReceiveInvoiceModal from "../../../Lightning/ReceiveModal/Invoice";
import ReceiveViewModel from "../../../Lightning/ReceiveModal/model";
import { observer } from "mobx-react-lite";

interface TransactionProps {
  open: boolean;
  close: () => void;
  invoice: InvoiceDetail;
}

const getInvoiceIcon = (
  type: InvoiceTypes,
): ReactNode => {
  switch (type) {
    case InvoiceTypes.Sent:
      return <SendIcon size={36}/>;
    case InvoiceTypes.Received:
      return <ReceiveIcon size={36}/>;
    case InvoiceTypes.OnChain:
      return <OnChainIcon/>;
  }
  return null;
};

const getInvoiceStatusIcon = (
  status: InvoiceStatus,
): ReactNode => {
  switch (status) {
    case InvoiceStatus.Expired:
      return <ExpiredIcon/>;
    case InvoiceStatus.Pending:
      return <img alt={'pending'} src={PendingIcon}/>
    case InvoiceStatus.Succeed:
      return <SuccessIcon/>;
  }
  return null;
};


export const InvoiceReceiveModal = observer((({open, close, invoice}: TransactionProps) => {
  const {lightning, runtime: {currencyRate}} = useAppStore();
  const [showInvoiceDetails, setShowInvoiceDetails] = useState<boolean>(false);
  const [invoiceModal, setInvoiceModal] = useState<ReceiveViewModel | null>(null);

  useEffect(() => {
    if (showInvoiceDetails) {
      const model = new ReceiveViewModel(lightning.current!.unit, currencyRate);
      model.updateCreatedInvoice(invoice.paymentRequest as string);
      setInvoiceModal(model);
    } else {
      setInvoiceModal(null);
    }
  }, [showInvoiceDetails])

  return (
    <Modal open={open} close={close}>
      <ModalHeader onClose={close}>
        <H3>{invoice.type}</H3>
      </ModalHeader>

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

              <RecordAmount>
                <span>{invoice.amount}</span>
                <span>Sats</span>
              </RecordAmount>
            </RecordStatusContainer>

            <LightningMark>
              <LightningIcon2/>
              <Caption>Lighting Invoice</Caption>
            </LightningMark>
          </RecordDetailsTop>

          <RecordDetailsBottom>
            <RecordItemRow>
              <RecordItemLabel>Status</RecordItemLabel>
              <RecordItemLabel
                succeed={invoice.status === InvoiceStatus.Succeed}
              >
                {invoice.status === InvoiceStatus.Succeed && 'Success'}
                {invoice.status === InvoiceStatus.Expired && 'Unpaid and Expired'}
              </RecordItemLabel>
            </RecordItemRow>

            <RecordItemRow>
              <RecordItemLabel>Invoice Create Time</RecordItemLabel>
              <RecordItemContent>{dayjs(invoice.date).format('YYYY-MM-DD HH:mm:ss')}</RecordItemContent>
            </RecordItemRow>

            {
              invoice.status === InvoiceStatus.Succeed && (
                <RecordItemRow>
                  <RecordItemLabel>Transaction Time</RecordItemLabel>
                  <RecordItemContent>{dayjs(invoice.date).format('YYYY-MM-DD HH:mm:ss')}</RecordItemContent>
                </RecordItemRow>
              )
            }

            <RecordItemRowDivider/>

            {
              invoice.status === InvoiceStatus.Succeed && (
                <RecordItemRow>
                  <RecordItemLabel>From</RecordItemLabel>
                  <OneLineRecordItemContent>{invoice.paymentRequest}</OneLineRecordItemContent>
                </RecordItemRow>
              )
            }

            <RecordItemRow>
              <RecordItemLabel>To</RecordItemLabel>
              <RecordItemContent>{lightning.current?.name}</RecordItemContent>
            </RecordItemRow>

            <RecordItemRowDivider/>

            <RecordItemRow>
              <RecordItemLabel>Amount</RecordItemLabel>
              <span>
            <RecordItemContent
              lowlight={invoice.status !== InvoiceStatus.Succeed}
            >{invoice.amount}{" "}</RecordItemContent>
            <RecordItemContent highlight>Sats</RecordItemContent>
          </span>
            </RecordItemRow>

            {
              invoice.description && (
                <>
                  <RecordItemRowDivider/>
                  <RecordItemLabel style={{margin: '20px 0 8px'}}>Description</RecordItemLabel>
                  <RecordItemContent style={{marginBottom: 20}}>{invoice.description}</RecordItemContent>
                </>
              )
            }

            {
              invoice.status === InvoiceStatus.Pending && (
                <PrimaryButton
                  primary
                  style={{marginTop: 44}}
                  onClick={() => {
                    setShowInvoiceDetails(true)
                  }}
                >
                  View Invoice
                </PrimaryButton>
              )
            }
          </RecordDetailsBottom>
        </RecordDetailsContent>
      </RecordDetailsContainer>

      {
        showInvoiceDetails && invoiceModal && (
          <LightningReceiveInvoiceModal model={invoiceModal} close={() => {
            setShowInvoiceDetails(false)
          }}/>
        )
      }
    </Modal>
  )
}));
