import React, { useState } from "react";
import { TransitionablePortal, ModalProps } from "semantic-ui-react";
import { StyledModal, StyledModalContainer, CloseIconContainer } from "./styles";
import CloseIcon from "../../components/Icons/CloseIcon";

export const Modal = ({close, children, ...rest}: ModalProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  return (
    <TransitionablePortal
      open={isVisible}
      transition={{animation: 'fade up', duration: 250}}
      closeOnDocumentClick={false}
    >
      <StyledModal open={true} {...rest}>
        <StyledModalContainer>
          <CloseIconContainer>
            <CloseIcon onClick={() => {
              setIsVisible(false);
              setTimeout(close, 250);
            }}/>
          </CloseIconContainer>
          {children}
        </StyledModalContainer>
      </StyledModal>
    </TransitionablePortal>
  )
}
