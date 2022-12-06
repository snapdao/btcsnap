import React from 'react';
import {
  Button,
  ButtonsContainer,
  PaymentAmount,
  PaymentParticipant,
  PaymentParticipantContainer,
  PaymentResult,
  PrimaryButton,
  ResultContent,
  ResultMainContainer,
  ResultMainContent,
  ResultSecondaryContainer
} from './styles';
import LightningSendViewModel from '../model';
import { ReactComponent as PayInvoiceSucceed } from './images/succeed.svg';
import { ReactComponent as PayInvoiceFailed } from './images/failed.svg';
import { ReactComponent as ToIcon } from './images/to.svg';
import { SendStatus } from '../types';
import { Modal } from '../../../../kits';
import { useAppStore } from '../../../../mobx';
import { observer } from 'mobx-react-lite';

export const ResultView = observer(({ model, close }: { model: LightningSendViewModel, close: () => void }) => {
  const { lightning } = useAppStore();

  return (
    <Modal open close={close}>
      <ResultContent>
        <ResultMainContainer>
          <ResultMainContent>
            {
              model.status === SendStatus.Succeed && (
                <>
                  <PayInvoiceSucceed/>
                  <PaymentResult>Payment Successful</PaymentResult>
                </>
              )
            }
            {
              model.status === SendStatus.Failed && (
                <>
                  <PayInvoiceFailed/>
                  <PaymentResult>Payment Failed</PaymentResult>
                </>
              )
            }
            <PaymentAmount>
              {model.amount}
              <span>sats</span>
            </PaymentAmount>
            <PaymentParticipantContainer>
              <PaymentParticipant>{lightning.current?.name}</PaymentParticipant>
              <ToIcon/>
              <PaymentParticipant>{model.invoice}</PaymentParticipant>
            </PaymentParticipantContainer>
          </ResultMainContent>
        </ResultMainContainer>
        <ResultSecondaryContainer>
          {
            model.status === SendStatus.Succeed && (
              <PrimaryButton primary onClick={close}>Done</PrimaryButton>
            )
          }
          {
            model.status === SendStatus.Failed && (
              <ButtonsContainer>
                <Button onClick={close}>Close</Button>
                <PrimaryButton primary onClick={
                  () => { model.setStatus(SendStatus.Init); }
                }>
                  Retry
                </PrimaryButton>
              </ButtonsContainer>
            )
          }
        </ResultSecondaryContainer>
      </ResultContent>
    </Modal>
  );
});
