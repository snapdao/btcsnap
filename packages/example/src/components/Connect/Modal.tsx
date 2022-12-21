import React, { useEffect, useRef, useState } from 'react';
import { Modal } from 'semantic-ui-react';
import { WalletType } from '../../interface';
import { useAppStore } from '../../mobx';
import CloseIcon from '../Icons/CloseIcon';
import './Modal.css';
import { StepIndicator } from './StepIndicator';
import { ModalHeader } from './styles';
import { StepIndicatorProps } from './StepIndicator';

enum ModalAnimation {
  FadeUp = 'fade-up',
  FadeLeft = 'fade-left',
  FadeOut = 'fade-out-left'
}

interface ConnectModalProps extends StepIndicatorProps{
  open: boolean;
  close: () => void;
  children: JSX.Element | JSX.Element[];
  isDisabled?: boolean;
  isFirstStep?: boolean;
}

const BasicModal = ({ open, close, children, isDisabled = false, totalStep, currentStep }: ConnectModalProps) => {
  const {
    switchWalletType
  } = useAppStore();
  const [isVisible, setIsVisible] = useState<boolean>(open);
  const openedBefore = useRef<boolean>();

  useEffect(() => {
    if (open) {
      setIsVisible(true);
      openedBefore.current = true;
    } else if (openedBefore.current) {
      setTimeout(() => {
        setIsVisible(false);
        switchWalletType(WalletType.BitcoinWallet);
      }, 250);
      openedBefore.current = false;
    }
  }, [open, isVisible, openedBefore]);

  return (
    <Modal
      size='mini'
      className={`Connect-Modal-Container ${ModalAnimation.FadeUp}`}
      open={isVisible}
    >
      <Modal.Content>
        <ModalHeader>
          <CloseIcon onClick={() => !isDisabled && close()} isDisabled={isDisabled}/>
          <StepIndicator totalStep={totalStep} currentStep={currentStep} />
        </ModalHeader>
        <div className='Connect-Modal-Content'>
          {children}
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default BasicModal;
