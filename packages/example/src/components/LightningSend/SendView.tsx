import React, { useRef } from 'react'
import {
  AmountCurrencyContainer,
  AmountInput,
  AmountTitle,
  Button,
  ButtonsContainer,
  HighLight,
  InvoiceDescription,
  InvoiceError,
  InvoiceInfo,
  InvoiceInfoContainer,
  InvoiceInput,
  InvoiceTitle,
  LightningSendContainer,
  LightningSendMainContainer,
  LightningSendModal,
  LightningSendSecondaryContainer,
  MetaMaskInteractionTips,
  PrimaryButton,
  SendMainContent,
  SendMainHeader,
  SendModalContent
} from "./styles";
import SendIcon from "../Icons/SendIcon";
import CloseIcon from "../Icons/CloseIcon";
import LightningSendViewModel from "./model";
import { observer } from "mobx-react-lite";
import { Popup } from "../../kits/Popup";
import { ConfirmView } from "./ConfirmView";
import { Loader, Modal } from "semantic-ui-react";
import { Message, MessageType } from "../../kits/Message";

export const SendView = observer(({model, close}: { model: LightningSendViewModel, close: () => void }) => {
  const {hours, minutes} = model.expireTime;
  const sendModalRef = useRef<any>();

  return (
    <LightningSendModal open={true} closeOnDocumentClick={false}>
      <LightningSendContainer ref={sendModalRef}>
        <SendModalContent>
          <LightningSendMainContainer>
            <SendMainHeader>
              <div>
                <SendIcon size={36}/>
                <span>SEND</span>
              </div>
              <CloseIcon onClick={close}/>
            </SendMainHeader>
            <SendMainContent>
              <InvoiceTitle>
                Invoice
              </InvoiceTitle>
              <InvoiceInput
                autoFocus={true}
                onChange={model.setInvoice}
                placeholder='Lightning Invoice'
                isValid={!model.shouldShowInvoiceNotValidError}
              />
              {
                model.shouldShowInvoiceNotValidError &&
                  <InvoiceError>
                      Invalid Invoice
                  </InvoiceError>
              }
              {
                model.isInvoiceValid && (
                  <>
                    <AmountTitle>Amount</AmountTitle>
                    <AmountInput readOnly value={`${model.amount} Sats`}/>
                    <AmountCurrencyContainer>
                      <span>${model.amountInCurrency}</span>
                      <span>Fee <HighLight>{model.feeRange}</HighLight> Sats</span>
                    </AmountCurrencyContainer>
                  </>
                )
              }
            </SendMainContent>
          </LightningSendMainContainer>
          <LightningSendSecondaryContainer>
            <InvoiceInfoContainer>
              {
                model.isInvoiceValid && (
                  <>
                    <InvoiceInfo>
                      <span>Balance</span>
                      <span>
                        <HighLight>{model.balance}</HighLight> Sats /
                        <HighLight>{model.balanceInCurrency}</HighLight> USD
                      </span>
                    </InvoiceInfo>
                    <InvoiceInfo>
                      <span>Expires in</span>
                      <span>
                        <HighLight>{hours}</HighLight> H
                        <HighLight>{" "}{minutes}</HighLight> Mins
                      </span>
                    </InvoiceInfo>
                    {
                      !!model.description && (
                        <InvoiceDescription>
                          <InvoiceInfo>
                            <span>Description</span>
                          </InvoiceInfo>
                          <Popup
                            content={model.description}
                            trigger={<p>{model.description}</p>}
                            wide
                          />
                        </InvoiceDescription>
                      )
                    }
                  </>
                )
              }
            </InvoiceInfoContainer>
            <ButtonsContainer>
              <Button onClick={close}>Cancel</Button>
              <PrimaryButton
                primary
                disabled={!model.isInvoiceValid}
                onClick={() => {
                  model.setIsConfirmModalOpen(true)
                  model.setError(undefined);
                }}
              >
                Send
              </PrimaryButton>
            </ButtonsContainer>
          </LightningSendSecondaryContainer>
        </SendModalContent>
        {
          model.isConfirmModalOpen && <ConfirmView model={model} parentNode={sendModalRef.current}/>
        }
        <Modal open={model.showMetaMaskTips} style={{ backgroundColor: 'transparent'}}>
          <Loader />
          <MetaMaskInteractionTips>Continue at MetaMask</MetaMaskInteractionTips>
        </Modal>
        {
          model.isRequestDenied && <Message type={MessageType.Error}>Payment failed. Please try again.</Message>
        }
      </LightningSendContainer>
    </LightningSendModal>
  )
});
