import React from 'react';
import { Modal } from '../../../../kits';
import { H3 } from '../../../../kits/Layout/Text/Title';
import { Caption } from '../../../../kits/Layout/Text/Body';
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
import { TransactionProps } from './index';
import { Icon } from 'snapkit';
import { getInvoiceStatusIcon } from './InvoiceReceiveModal';
import { InvoiceStatus } from '../../../../types';
import { useAppStore } from '../../../../mobx';
import { BitcoinUnit } from '../../../../interface';
import BigNumber from 'bignumber.js';
import { satoshiToBTC } from '../../../../lib/helper';

export const OnChainModal = (({ open, close, invoice, parent }: TransactionProps) => {
  const { currentUnit } = useAppStore();

  const amountText = currentUnit === BitcoinUnit.BTC ? BigNumber(satoshiToBTC(invoice.amount)).toFixed()
    : invoice.amount;

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
              <RecordType isOnChain>
                <Icon.OnChain color={'#1F69FF'} width={'36px'} height={'36px'}/>
                <RecordStatus>
                  {getInvoiceStatusIcon(invoice.status)}
                </RecordStatus>
              </RecordType>

              <RecordAmount>
                <span>{amountText}</span>
                <span>{currentUnit}</span>
              </RecordAmount>
            </RecordStatusContainer>

            <LightningMark>
              <Caption>Top Up</Caption>
            </LightningMark>
          </RecordDetailsTop>

          <RecordDetailsBottom>
            <RecordItemRow>
              <RecordItemLabel>Status</RecordItemLabel>
              <RecordItemLabel
                succeed={invoice.status === InvoiceStatus.Succeed}
                highlight={invoice.status === InvoiceStatus.Pending}>
                {invoice.status}
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
          </RecordDetailsBottom>
        </RecordDetailsContent>
      </RecordDetailsContainer>
      <BottomGradientLayerContainer>
        <GradientLayer />
      </BottomGradientLayerContainer>
    </Modal>
  );
});
