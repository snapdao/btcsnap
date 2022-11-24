import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { ModalProps, TransitionablePortal } from 'semantic-ui-react';
import { Modal } from '..';
import { Button } from '../../Button';
import { Body, H3 } from '../../Layout/Text';
import { Container, StyledModal } from './styles';

interface Props extends ModalProps {
  title?: string;
  onClose: () => void;
  onCancel: () => void;
  onConfirm: () => void;
  cancelText?: string;
  confirmText?: string;
  parentNode: any;
}

const ModalConfirm = ({
  open,
  onClose,
  title,
  children,
  onCancel,
  onConfirm,
  parentNode,
  cancelText = 'Cancel',
  confirmText = 'Confirm',
  ...rest
}: Props) => {
  const [isVisible, setIsVisible] = useState<boolean>(open || false);
  const previousOpen = useRef<boolean>(false);

  const closeModal = useCallback(() => {
    setIsVisible(false);
    setTimeout(onClose, 250);
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
      closeOnDocumentClick={false}>
      <StyledModal open={true} mountNode={parentNode} {...rest}>
        <Modal.Header onClose={onClose}>
          <H3>{title}</H3>
        </Modal.Header>
        <Container>
          <Body>{children}</Body>
        </Container>
        <Modal.Footer>
          <Button onClick={onCancel}>{cancelText}</Button>
          <Button className='error' onClick={onConfirm}>
            {confirmText}
          </Button>
        </Modal.Footer>
      </StyledModal>
    </TransitionablePortal>
  );
};

export default ModalConfirm;
