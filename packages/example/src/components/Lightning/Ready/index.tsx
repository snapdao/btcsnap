import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { ReactComponent as SendSuccess } from '../../../assets/send_success.svg';
import {
  LNSetupModal,
  LastStepIcon,
  LastStepTitle,
  LastStepText,
  CreateButton,
  StartButton,
  ConfettiContainer,
  LNSetupModalContent,
  ButtonsContainer,
} from './styles';
import CloseIcon from '../../Icons/CloseIcon';
import { TransitionablePortal } from 'semantic-ui-react';
import { useAppStore } from '../../../mobx';
import { LightningContext } from '../ctx';
import { LNWalletStepStatus } from '../../../mobx/user';
import { CloseContainer } from '../styles';

const Ready = observer(() => {
  const {
    user: { setLNWalletStep },
  } = useAppStore();

  const onUserGuide = () => {
    setLNWalletStep(LNWalletStepStatus.UserGuide);
  };

  const { state, update } = useContext(LightningContext);

  function showCreateWallet() {
    setLNWalletStep(LNWalletStepStatus.CreateWallet);
    update({
      ...state,
      setupStep: 'createWallet',
    });
  }

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
            <CloseIcon onClick={onUserGuide} />
          </CloseContainer>
          <LastStepIcon>
            <SendSuccess />
          </LastStepIcon>
          <LastStepTitle>Your Bitcoin Wallet is Ready!</LastStepTitle>
          <LastStepText>You’ve successfully setup your wallet!</LastStepText>
          <ButtonsContainer>
            <CreateButton onClick={showCreateWallet}>
              Create Lightning Wallets
            </CreateButton>
            <span>or</span>
            <StartButton primary onClick={onUserGuide}>
              Start Using Now
            </StartButton>
          </ButtonsContainer>
        </LNSetupModalContent>
      </LNSetupModal>
    </TransitionablePortal>
  );
});

export default Ready;
