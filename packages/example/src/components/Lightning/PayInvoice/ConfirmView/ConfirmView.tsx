import React from 'react';
import LightningSendViewModel from '../model';
import {
  ConfirmHighlight,
  ConfirmInfo,
  ConfirmInfoContainer,
  ConfirmMainContainer,
  ConfirmMainContent, ConfirmModal,
  ConfirmSecondaryContainer,
  SendingAmount,
  SendingText,
  SendingTo
} from './styles';
import { ConfirmModalContent } from './styles';
import { HighLight, InvoiceDescription, PrimaryButton } from '../styles';
import { Modal, Popup } from '../../../../kits';

export const ConfirmView = ({ open, model, parentNode }: { open: boolean, model: LightningSendViewModel, parentNode: any }) => {
  const { hours, minutes } = model.expireTime;

  function close() {
    model.setIsConfirmModalOpen(false);
  }
  return (
    <ConfirmModal
      open={open}
      close={close}
      mountNode={parentNode}
    >
      <ConfirmModalContent>
        <Modal.Header onClose={close}>
          <span>Confirm Transaction</span>
        </Modal.Header>
        <ConfirmMainContainer>
          <ConfirmMainContent>
            <SendingText>You’re Sending</SendingText>
            <SendingAmount>
              {model.amount}<span>sats</span>
            </SendingAmount>
            <SendingText>To</SendingText>
            <SendingTo>{model.invoice}</SendingTo>
          </ConfirmMainContent>
        </ConfirmMainContainer>
        <ConfirmSecondaryContainer>
          <ConfirmInfoContainer>
            {
              model.isInvoiceValid && (
                <>
                  <ConfirmInfo>
                    <span>Amount</span>
                    <span>
                      <HighLight>{model.amount}</HighLight>
                      <ConfirmHighlight>sats</ConfirmHighlight>
                    </span>
                  </ConfirmInfo>
                  <ConfirmInfo>
                    <span>Fee</span>
                    <span>
                      <HighLight>{model.feeRange}</HighLight>
                      <ConfirmHighlight>sats</ConfirmHighlight>
                    </span>
                  </ConfirmInfo>
                  <hr/>
                  <ConfirmInfo>
                    <span>Expires in</span>
                    <span>
                      <HighLight>{hours}</HighLight> H
                      <HighLight>{' '}{minutes}</HighLight> Mins
                    </span>
                  </ConfirmInfo>
                  {
                    !!model.description && (
                      <InvoiceDescription>
                        <ConfirmInfo>
                          <span>Description</span>
                        </ConfirmInfo>
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
          </ConfirmInfoContainer>
          <PrimaryButton
            primary
            disabled={!model.isInvoiceValid}
            onClick={model.signInvoice}
          >
            Confirm
          </PrimaryButton>
        </ConfirmSecondaryContainer>
      </ConfirmModalContent>
    </ConfirmModal>
  );
};
