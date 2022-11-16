import React from "react";
import LightningSendViewModel from "../model";
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
} from "./styles";
import { ConfirmModalContent, ConfirmMainHeader } from "./styles";
import { HighLight, InvoiceDescription, PrimaryButton } from "../styles";
import { Popup } from "../../../../kits";

export const ConfirmView = ({open, model, parentNode}: { open: boolean, model: LightningSendViewModel, parentNode: any }) => {
  const {hours, minutes} = model.expireTime;

  return (
    <ConfirmModal
      open={open}
      close={() => {
        model.setIsConfirmModalOpen(false)
      }}
      mountNode={parentNode}
    >
      <ConfirmModalContent>
        <ConfirmMainContainer>
          <ConfirmMainHeader>
            <span>Confirm Transaction</span>
          </ConfirmMainHeader>
          <ConfirmMainContent>
            <SendingText>You’re Sending</SendingText>
            <SendingAmount>
              {model.amount}<span>Sats</span>
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
                        <ConfirmHighlight>Sats</ConfirmHighlight>
                      </span>
                  </ConfirmInfo>
                  <ConfirmInfo>
                    <span>Fee</span>
                    <span>
                        <HighLight>{model.feeRange}</HighLight>
                        <ConfirmHighlight>Sats</ConfirmHighlight>
                      </span>
                  </ConfirmInfo>
                  <hr/>
                  <ConfirmInfo>
                    <span>Expires in</span>
                    <span>
                        <HighLight>{hours}</HighLight> H
                        <HighLight>{" "}{minutes}</HighLight> Mins
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
  )
}
