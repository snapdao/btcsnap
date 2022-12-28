import React, {
  forwardRef,
  ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { TransitionablePortal, ModalProps } from 'semantic-ui-react';
import {
  StyledModal,
  StyledModalContainer,
} from './styles';
import ModalBackground from './Background';
import ModalHeader from './Header';
import ModalConfirm from './Confirm';
import ModalLoading from './ModalLoading';
import ModalFooter from './Footer';
import ModalContainer from './Container';

type Props = ModalProps & {
  open: boolean,
  close: () => void,
  children: ReactNode
  key: string
}

type RefHandle = {
  onClose: () => void
}

const BaseModal = forwardRef<RefHandle, Props>(
  (
    { open, close, children, key, ...rest },
    ref,
  ) => {
    const [isVisible, setIsVisible] = useState<boolean>(open || false);
    const previousOpen = useRef<boolean>(false);

    const closeModal = useCallback(() => {
      setIsVisible(false);
      close && setTimeout(close, 250);
    }, []);

    useImperativeHandle(ref, () => ({
      onClose: closeModal,
    }));

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
          <StyledModalContainer>{children}</StyledModalContainer>
        </StyledModal>
      </TransitionablePortal>
    );
  },
);

export const Modal = Object.assign({}, BaseModal, {
  Background: ModalBackground,
  Header: ModalHeader,
  Container: ModalContainer,
  Footer: ModalFooter,
  Confirm: ModalConfirm,
  Loading: ModalLoading,
});
