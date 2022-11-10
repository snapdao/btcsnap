import React from 'react';
import {
  ButtonsContainer,
  PaymentAmount, PaymentParticipant, PaymentParticipantContainer,
  PaymentResult, PrimaryButton, ResultContent,
  ResultMainContainer,
  ResultMainContent,
  ResultMainHeader,
  ResultModal,
  Button,
  ResultSecondaryContainer
} from "./styles";
import LightningSendViewModel from "../model";
import { TransitionablePortal } from "semantic-ui-react";
import CloseIcon from "../../Icons/CloseIcon";
import { ReactComponent as PayInvoiceSucceed } from "./images/succeed.svg";
import { ReactComponent as PayInvoiceFailed } from "./images/failed.svg";
import { ReactComponent as ToIcon } from "./images/to.svg";
import { SendStatus } from "../types";

export const ResultView = ({model, close}: { model: LightningSendViewModel, close: () => void }) => {
  return (
    <TransitionablePortal
      open={true}
      transition={{animation: 'fade up', duration: 250}}
    >
      <ResultModal open={true}>
        <ResultContent>
          <ResultMainContainer>
            <ResultMainHeader>
              <CloseIcon onClick={close}/>
            </ResultMainHeader>
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
              <PaymentAmount>1000</PaymentAmount>
              <PaymentParticipantContainer>
                <PaymentParticipant>Lightning Wallet Name</PaymentParticipant>
                <ToIcon/>
                <PaymentParticipant>Lightning Wallet Name 2 3</PaymentParticipant>
              </PaymentParticipantContainer>
            </ResultMainContent>
          </ResultMainContainer>
          <ResultSecondaryContainer>
            {
              model.status === SendStatus.Succeed && <PrimaryButton primary>Done</PrimaryButton>
            }
            {
              model.status === SendStatus.Failed && (
                <ButtonsContainer>
                  <Button onClick={close}>Close</Button>
                  <PrimaryButton primary>Retry</PrimaryButton>
                </ButtonsContainer>
              )
            }
          </ResultSecondaryContainer>
        </ResultContent>
      </ResultModal>
    </TransitionablePortal>
  )
}
