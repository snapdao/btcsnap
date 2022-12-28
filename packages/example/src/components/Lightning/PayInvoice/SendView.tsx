import React, { useRef } from 'react';
import {
  AmountCurrencyContainer,
  AmountInput,
  AmountTitle,
  Button,
  ButtonsContainer,
  ErrorMessage,
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
  SendModalContent,
} from './styles';
import SendIcon from '../../Icons/SendIcon';
import LightningSendViewModel from './model';
import { observer } from 'mobx-react-lite';
import { ConfirmView } from './ConfirmView';
import { Loader, Modal as SemanticModal } from 'semantic-ui-react';
import { Modal, Popup, Message, MessageType, H3 } from '../../../kits';
import { trackLightningSend } from '../../../tracking';

export const SendView = observer(
  ({
    model,
    close,
  }: {
    model: LightningSendViewModel;
    close: () => void;
  }) => {
    const { hours, minutes } = model.expireTime;
    const modalRef = useRef<any>(null);
    const sendModalRef = useRef<any>();

    return (
      <Modal ref={modalRef} open close={close}>
        <LightningSendContainer ref={sendModalRef}>
          <SendModalContent>
            <Modal.Header
              left={
                <>
                  <SendIcon size={36} />
                  <H3>SEND</H3>
                </>
              }
              onClose={() => modalRef.current?.onClose()}></Modal.Header>
            <LightningSendMainContainer>
              <SendMainContent>
                <InvoiceTitle>Invoice</InvoiceTitle>
                <InvoiceInput
                  autoFocus={true}
                  onChange={model.setInvoice}
                  value={model.invoice}
                  placeholder='Lightning Invoice'
                  isValid={!model.shouldShowInvoiceNotValidError}
                />
                {model.shouldShowInvoiceNotValidError && (
                  <InvoiceError>Invalid Invoice</InvoiceError>
                )}
                {model.isInvoiceValid && (
                  <>
                    <AmountTitle>Amount</AmountTitle>
                    <AmountInput readOnly value={`${model.amount} sats`} />
                    <AmountCurrencyContainer>
                      {model.isBalanceEnoughToPay ? (
                        <span>${model.amountInCurrency}</span>
                      ) : (
                        <ErrorMessage>Insufficient Funds</ErrorMessage>
                      )}
                      <span>
                        Fee <HighLight>{model.feeRange}</HighLight> sats
                      </span>
                    </AmountCurrencyContainer>
                  </>
                )}
              </SendMainContent>
            </LightningSendMainContainer>
            <LightningSendSecondaryContainer>
              <InvoiceInfoContainer>
                {model.isInvoiceValid && (
                  <>
                    <InvoiceInfo>
                      <span>Balance</span>
                      <span>
                        <HighLight>{model.balance}</HighLight> sats /{' '}
                        <HighLight>{model.balanceInCurrency}</HighLight> USD
                      </span>
                    </InvoiceInfo>
                    <InvoiceInfo>
                      <span>Expires in</span>
                      {model.isInvoiceExpired ? (
                        <ErrorMessage>expired</ErrorMessage>
                      ) : (
                        <span>
                          <HighLight>{hours}</HighLight> H
                          <HighLight> {minutes}</HighLight> Mins
                        </span>
                      )}
                    </InvoiceInfo>
                    {!!model.description && (
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
                    )}
                  </>
                )}
              </InvoiceInfoContainer>
              <ButtonsContainer>
                <Button onClick={() => modalRef.current?.onClose()}>
                  Cancel
                </Button>
                <PrimaryButton
                  primary
                  disabled={!model.ableToSend}
                  onClick={() => {
                    model.setIsConfirmModalOpen(true);
                    model.setError(undefined);
                    trackLightningSend({
                      step: 'create'
                    });
                  }}>
                  Send
                </PrimaryButton>
              </ButtonsContainer>
            </LightningSendSecondaryContainer>
          </SendModalContent>

          <ConfirmView
            open={model.isConfirmModalOpen}
            model={model}
            parentNode={sendModalRef.current}
          />

          <SemanticModal
            open={model.showMetaMaskTips}
            style={{ backgroundColor: 'transparent' }}>
            <Loader />
            <MetaMaskInteractionTips>
              Continue at MetaMask
            </MetaMaskInteractionTips>
          </SemanticModal>
          {model.isRequestDenied && (
            <Message type={MessageType.Error}>
              Payment failed. Please try again.
            </Message>
          )}
          <SemanticModal
            open={model.isPaying}
            style={{ backgroundColor: 'transparent' }}>
            <Loader />
          </SemanticModal>
        </LightningSendContainer>
      </Modal>
    );
  },
);
