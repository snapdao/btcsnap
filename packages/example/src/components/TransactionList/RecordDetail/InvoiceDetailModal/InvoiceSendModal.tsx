import React from 'react';
import SendIcon from "../../../Icons/SendIcon";
import { InvoiceTypes } from "../../../../types";
import { Modal } from "../../../../kits";
import { H3 } from "../../../../kits/Layout/Text/Title";
import { Caption } from "../../../../kits/Layout/Text/Body";
import { useAppStore } from "../../../../mobx";
import { LightningIcon2 } from "../../../Icons/LightningIcon2";
import {
  LightningMark,
  ModalHeader,
  RecordAmount,
  RecordStatus,
  RecordStatusContainer,
  RecordType,
} from "./styles"
import {
  RecordDetailsTop,
  RecordDetailsBottom,
  RecordItemContent,
  RecordItemLabel,
  RecordItemRow,
  RecordItemRowDivider, RecordDetailsContainer, RecordDetailsContent
} from '../styles';
import dayjs from "dayjs";
import SuccessIcon from "../../../Icons/SuccessIcon";
import { TransactionProps } from "./index";

export const InvoiceSendModal = (({open, close, invoice}: TransactionProps) => {
  const {lightning} = useAppStore()

  return (
    <Modal open={open} close={close}>
      <ModalHeader onClose={close}>
        <H3>{invoice.type}</H3>
      </ModalHeader>

      <RecordDetailsContainer>
        <RecordDetailsContent>
          <RecordDetailsTop>
            <RecordStatusContainer>
              <RecordType isSend>
                <SendIcon size={36}/>
                <RecordStatus>
                  <SuccessIcon/>
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
                succeed={invoice.type === InvoiceTypes.Sent}
              >
                {invoice.type === InvoiceTypes.Sent && 'Success'}
              </RecordItemLabel>
            </RecordItemRow>

            <RecordItemRow>
              <RecordItemLabel>Transaction Time</RecordItemLabel>
              <RecordItemContent>{dayjs(invoice.date).format('YYYY-MM-DD HH:mm:ss')}</RecordItemContent>
            </RecordItemRow>

            <RecordItemRowDivider/>

            <RecordItemRow>
              <RecordItemLabel>From</RecordItemLabel>
              <RecordItemContent>{lightning.current?.name}</RecordItemContent>
            </RecordItemRow>
            <RecordItemRow>
              <RecordItemLabel>To</RecordItemLabel>
              <RecordItemContent>{invoice.address}</RecordItemContent>
            </RecordItemRow>

            <RecordItemRowDivider/>

            <RecordItemRow>
              <RecordItemLabel>Amount</RecordItemLabel>
              <span>
            <RecordItemContent lowlight>{invoice.amount}{" "}</RecordItemContent>
            <RecordItemContent highlight>Sats</RecordItemContent>
          </span>
            </RecordItemRow>

            <RecordItemRow>
              <RecordItemLabel>Fee</RecordItemLabel>
              <span>
                <RecordItemContent lowlight>{invoice.fee}{" "}</RecordItemContent>
                <RecordItemContent highlight>Sats</RecordItemContent>
              </span>
            </RecordItemRow>

            {
              invoice.description && (
                <>
                  <RecordItemLabel style={{marginBottom: 8}}>Description</RecordItemLabel>
                  <RecordItemContent style={{marginBottom: 20}}>{invoice.description}</RecordItemContent>
                </>
              )
            }
          </RecordDetailsBottom>
        </RecordDetailsContent>
      </RecordDetailsContainer>
    </Modal>
  )
})
