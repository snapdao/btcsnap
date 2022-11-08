import React, { useState } from "react";
import { TransitionablePortal } from "semantic-ui-react";
import LightningSendViewModel from "../model";
import { ConfirmModal } from "./styles";
import { LightningSendMainContainer, SendMainHeader, SendModalContent } from "../styles";
import SendIcon from "../../Icons/SendIcon";
import CloseIcon from "../../Icons/CloseIcon";

export const ConfirmView = ({model, parentNode}: { model: LightningSendViewModel, parentNode: any }) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  
  return (
    <TransitionablePortal
      open={isVisible}
      transition={{ animation: 'fade up', duration: 250 }}
    >
      <ConfirmModal
        open={true}
        mountNode={parentNode}
        closeOnDocumentClick={false}
      >
        <SendModalContent>
          <LightningSendMainContainer>
            <SendMainHeader>
              <div>
                <SendIcon size={36}/>
                <span>Confirm</span>
              </div>
              <CloseIcon onClick={() => {
                setIsVisible(false);
                setTimeout(() => {
                  model.setIsConfirmModalOpen(false)
                }, 250);
              }}/>
            </SendMainHeader>
          </LightningSendMainContainer>
        </SendModalContent>
      </ConfirmModal>
    </TransitionablePortal>
  )
}