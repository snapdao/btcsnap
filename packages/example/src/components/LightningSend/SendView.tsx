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
  LightningSendSecondaryContainer,
  MetaMaskInteractionTips,
  PrimaryButton,
  SendMainContent,
  SendMainHeader,
  SendModalContent
} from "./styles";
import SendIcon from "../Icons/SendIcon";
import LightningSendViewModel from "./model";
import { observer } from "mobx-react-lite";
import { Popup } from "../../kits/Popup";
import { ConfirmView } from "./ConfirmView";
import { Loader, Modal as SemanticModal } from "semantic-ui-react";
import { Message, MessageType } from "../../kits/Message";
import { Modal } from "../../kits/Modal";

export const SendView = observer(({model, close}: { model: LightningSendViewModel, close: () => void }) => {
  const {hours, minutes} = model.expireTime;
  const sendModalRef = useRef<any>();

  return (
    <Modal close={close}>
      <LightningSendContainer ref={sendModalRef}>
        <SendModalContent>
          <LightningSendMainContainer>
            <SendMainHeader>
              <SendIcon size={36}/>
              <span>SEND</span>
            </SendMainHeader>
            <SendMainContent>
              <InvoiceTitle>
                Invoice
              </InvoiceTitle>
              <InvoiceInput
                autoFocus={true}
                onChange={model.setInvoice}
                value={model.invoice}
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
                        <HighLight>{model.balance}</HighLight> Sats / <HighLight>{model.balanceInCurrency}</HighLight> USD
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
                disabled={!model.ableToSend}
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
        <SemanticModal open={model.showMetaMaskTips} style={{ backgroundColor: 'transparent'}}>
          <Loader />
          <MetaMaskInteractionTips>Continue at MetaMask</MetaMaskInteractionTips>
        </SemanticModal>
        {
          model.isRequestDenied && <Message type={MessageType.Error}>Payment failed. Please try again.</Message>
        }
        <SemanticModal open={model.isPaying} style={{ backgroundColor: 'transparent'}}>
          <Loader />
        </SemanticModal>
      </LightningSendContainer>
    </Modal>
  )
});
