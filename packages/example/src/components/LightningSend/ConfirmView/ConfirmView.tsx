import React, { useState } from "react";
import { TransitionablePortal } from "semantic-ui-react";
import LightningSendViewModel from "../model";
import {
  ConfirmHighlight,
  ConfirmInfo,
  ConfirmInfoContainer,
  ConfirmMainContainer,
  ConfirmMainContent,
  ConfirmModal, ConfirmSecondaryContainer,
  SendingAmount,
  SendingText,
  SendingTo
} from "./styles";
import { ConfirmModalContent, ConfirmMainHeader } from "./styles";
import CloseIcon from "../../Icons/CloseIcon";
import { HighLight, InvoiceDescription, PrimaryButton } from "../styles";
import { Popup } from "../../../kits/Popup";

export const ConfirmView = ({model, parentNode}: { model: LightningSendViewModel, parentNode: any }) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const {hours, minutes} = model.expireTime;

  return (
    <TransitionablePortal
      open={isVisible}
      transition={{animation: 'fade up', duration: 250}}
    >
      <ConfirmModal
        open={true}
        mountNode={parentNode}
        closeOnDocumentClick={false}
      >
        <ConfirmModalContent>
          <ConfirmMainContainer>
            <ConfirmMainHeader>
              <span>Confirm Transaction</span>
              <CloseIcon onClick={() => {
                setIsVisible(false);
                setTimeout(() => {
                  model.setIsConfirmModalOpen(false)
                }, 250);
              }}/>
            </ConfirmMainHeader>
            <ConfirmMainContent>
              <SendingText>You’re Sending</SendingText>
              <SendingAmount>
                {model.amount}<span>Sats</span>
              </SendingAmount>
              <SendingText>To</SendingText>
              <SendingTo>XXX@ln.tips</SendingTo>
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
              onClick={model.payInvoice}
            >
              Confirm
            </PrimaryButton>
          </ConfirmSecondaryContainer>
        </ConfirmModalContent>
      </ConfirmModal>
    </TransitionablePortal>
  )
}