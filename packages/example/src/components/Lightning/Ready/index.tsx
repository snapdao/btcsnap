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
import { LNWalletStepStatus } from '../../../mobx/user';
import { CloseContainer } from '../styles';

const Ready = observer(() => {
  const {
    user: { setLNWalletStep },
  } = useAppStore();

  function onToUserGuide() {
    setLNWalletStep(LNWalletStepStatus.UserGuide);
  }

  function onToCreateWallet() {
    setLNWalletStep(LNWalletStepStatus.CreateWallet);
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
            <CloseIcon onClick={onToUserGuide} />
          </CloseContainer>
          <LastStepIcon>
            <SendSuccess />
          </LastStepIcon>
          <LastStepTitle>Your Bitcoin Wallet is Ready!</LastStepTitle>
          <LastStepText>You’ve successfully setup your wallet!</LastStepText>
          <ButtonsContainer>
            <CreateButton onClick={onToCreateWallet}>
              Create Lightning Wallets
            </CreateButton>
            <span>or</span>
            <StartButton primary onClick={onToUserGuide}>
              Start Using Now
            </StartButton>
          </ButtonsContainer>
        </LNSetupModalContent>
      </LNSetupModal>
    </TransitionablePortal>
  );
});

export default Ready;
