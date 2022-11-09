import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { ReactComponent as SendSuccess } from '../../assets/send_success.svg';
import {
  LNSetupModal,
  CloseContainer,
  LastStepIcon,
  LastStepTitle,
  LastStepText,
  CreateButton,
  StartButton,
  ConfettiContainer,
  LNSetupModalContent,
  ButtonsContainer,
} from './styles';
import { useAppStore } from '../../mobx';
import { LNWalletStepStatus } from '../../mobx/user';
import CloseIcon from '../Icons/CloseIcon';
import { TransitionablePortal } from 'semantic-ui-react';

interface UserOperations {
  createWallet: () => void;
}

const SetupLightning = observer(({ createWallet }: UserOperations) => {
  const {
    user: { setLNWalletStep },
  } = useAppStore();
  const useWallet = () => {
    setLNWalletStep(LNWalletStepStatus.UserGuide);
  };

  return (
    <TransitionablePortal
      open={true}
      transition={{ animation: 'fade up', duration: '300' }}>
      <LNSetupModal open={true}>
        <LNSetupModalContent>
          <ConfettiContainer
            width={window.innerWidth}
            height={window.innerHeight}
          />
          <CloseContainer>
            <CloseIcon onClick={useWallet} />
          </CloseContainer>
          <LastStepIcon>
            <SendSuccess />
          </LastStepIcon>
          <LastStepTitle>Your Bitcoin Wallet is Ready!</LastStepTitle>
          <LastStepText>You’ve successfully setup your wallet!</LastStepText>
          <ButtonsContainer>
            <CreateButton onClick={createWallet}>
              Create Lightning Wallets
            </CreateButton>
            <span>or</span>
            <StartButton primary onClick={useWallet}>
              Start Using Now
            </StartButton>
          </ButtonsContainer>
        </LNSetupModalContent>
      </LNSetupModal>
    </TransitionablePortal>
  );
});

export default SetupLightning;
