import React from 'react';
import SendIcon from '../../../Icons/SendIcon';
import { InvoiceTypes } from '../../../../types';
import { Modal } from '../../../../kits';
import { H3 } from '../../../../kits/Layout/Text/Title';
import { Caption } from '../../../../kits/Layout/Text/Body';
import { LightningIcon2 } from '../../../Icons/LightningIcon2';
import {
  BottomGradientLayerContainer,
  LightningMark,
  RecordAmount,
  RecordStatus,
  RecordStatusContainer,
  RecordType,
} from './styles';
import {
  ModalTitleContainer,
  RecordDetailsTop,
  RecordDetailsBottom,
  RecordItemContent,
  RecordItemLabel,
  RecordItemRow,
  RecordItemRowDivider, RecordDetailsContainer, RecordDetailsContent, GradientLayer
} from '../styles';
import dayjs from 'dayjs';
import SuccessIcon from '../../../Icons/SuccessIcon';
import { TransactionProps } from './index';
import { useAppStore } from '../../../../mobx';
import { BitcoinUnit } from '../../../../interface';
import BigNumber from 'bignumber.js';
import { satoshiToBTC } from '../../../../lib/helper';

export const InvoiceSendModal = (({ open, close, invoice, parent }: TransactionProps) => {
  const { currentUnit } = useAppStore();

  const amountText = currentUnit === BitcoinUnit.BTC ? BigNumber(satoshiToBTC(invoice.amount)).toFixed()
    : invoice.amount;

  const feeText = invoice.fee || invoice.fee === 0 ? currentUnit === BitcoinUnit.BTC ? BigNumber(satoshiToBTC(invoice.fee)).toFixed()
    : invoice.fee : '--';

  return (
    <Modal open={open} close={close} mountNode={parent}>
      <Modal.Header bannerMode onClose={close}>
        <ModalTitleContainer>
          <H3>{invoice.type}</H3>
        </ModalTitleContainer>
      </Modal.Header>

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
                <span>{amountText}</span>
                <span>{currentUnit}</span>
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
              <RecordItemLabel>Amount</RecordItemLabel>
              <span>
                <RecordItemContent lowlight>{amountText}{' '}</RecordItemContent>
                <RecordItemContent highlight>{currentUnit}</RecordItemContent>
              </span>
            </RecordItemRow>

            <RecordItemRow>
              <RecordItemLabel>Fee</RecordItemLabel>
              <span>
                <RecordItemContent lowlight>{feeText}{' '}</RecordItemContent>
                <RecordItemContent highlight>{currentUnit}</RecordItemContent>
              </span>
            </RecordItemRow>

            {
              invoice.description && (
                <>
                  <RecordItemLabel style={{ marginBottom: 8 }}>Description</RecordItemLabel>
                  <RecordItemContent style={{ marginBottom: 20 }}>{invoice.description}</RecordItemContent>
                </>
              )
            }
          </RecordDetailsBottom>
        </RecordDetailsContent>
      </RecordDetailsContainer>
      <BottomGradientLayerContainer>
        <GradientLayer />
      </BottomGradientLayerContainer>
    </Modal>
  );
});
