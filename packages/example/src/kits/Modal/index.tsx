import React, { useCallback, useEffect, useRef, useState } from 'react';
import { TransitionablePortal, ModalProps } from 'semantic-ui-react';
import {
  StyledModal,
  StyledModalContainer,
  CloseIconContainer,
} from './styles';
import CloseIcon from '../../components/Icons/CloseIcon';
import ModalBackground from './Background';
import ModalHeader from './Header';
import ModalConfirm from './Confirm';
import ModalLoading from './ModalLoading';
import ModalFooter from './Footer';
import ModalContainer from './Container';

const Modal = ({ open, close, children, key, ...rest }: ModalProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(open || false);
  const previousOpen = useRef<boolean>(false);

  const closeModal = useCallback(() => {
    setIsVisible(false);
    setTimeout(close, 250);
  }, []);

  useEffect(() => {
    if (previousOpen.current && !open) {
      previousOpen.current = false;
      closeModal();
    }
    if (open) {
      previousOpen.current = true;
      setIsVisible(true);
    }
  }, [open, previousOpen]);

  return (
    <TransitionablePortal
      open={isVisible}
      transition={{ animation: 'fade up', duration: 250 }}
      closeOnDocumentClick={false}
      key={key}>
      <StyledModal open={true} {...rest}>
        <StyledModalContainer>
          <CloseIconContainer>
            <CloseIcon onClick={closeModal} />
          </CloseIconContainer>
          {children}
        </StyledModalContainer>
      </StyledModal>
    </TransitionablePortal>
  );
};

Modal.Background = ModalBackground;
Modal.Header = ModalHeader;
Modal.Container = ModalContainer;
Modal.Footer = ModalFooter;
Modal.Confirm = ModalConfirm;
Modal.Loading = ModalLoading;

export { Modal };
