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
  CloseContainer,
  LNSetupModalContent,
  ButtonsContainer,
} from './styles';
import CloseIcon from '../../Icons/CloseIcon';
import { TransitionablePortal } from 'semantic-ui-react';
import { useAppStore } from '../../../mobx';
import { LNWalletStepStatus } from '../../../mobx/user';
import { useState } from 'react';
import CreateWallet from '../CreateWallet';
import { AddLightningWallet } from '../../WalletList/AddLightningWallet';

export const Ready = observer(() => {
  const {
    user: { LNWalletStep, setLNWalletStep },
  } = useAppStore();
  const [shouldShowCreateWallet, setShouldShowCreateWallet] = useState<boolean>(false);

  function onToUserGuide() {
    setLNWalletStep(LNWalletStepStatus.UserGuide);
  }

  function onToCreateWallet() {
    setShouldShowCreateWallet(true);
  }

  if(LNWalletStep !== LNWalletStepStatus.Ready){
    return null;
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
            <AddLightningWallet onAddWallet={onToCreateWallet} />
            <StartButton primary onClick={onToUserGuide}>
              Start Using BitcoinSnap
            </StartButton>
          </ButtonsContainer>
        </LNSetupModalContent>
        <CreateWallet open={shouldShowCreateWallet} close={() => {setShouldShowCreateWallet(false);}} />
      </LNSetupModal>
    </TransitionablePortal>
  );
});
