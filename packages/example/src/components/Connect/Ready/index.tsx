import { observer } from 'mobx-react-lite';
import { ReactComponent as SendSuccess } from '../../../assets/send_success.svg';
import {
  LNSetupModal,
  LastStepIcon,
  LastStepTitle,
  LastStepText,
  StartButton,
  ConfettiContainer,
  CloseContainer,
  LNSetupModalContent,
  ButtonsContainer, StepsContainer,
} from './styles';
import CloseIcon from '../../Icons/CloseIcon';
import { TransitionablePortal } from 'semantic-ui-react';
import { useAppStore } from '../../../mobx';
import { LNWalletStepStatus } from '../../../mobx/user';
import { useState } from 'react';
import CreateWallet from '../../Lightning/CreateWallet';
import { AddLightningWallet } from '../../WalletList/AddLightningWallet';
import { trackLightningSetup } from '../../../tracking';
import { StepIndicator, StepIndicatorProps } from '../StepIndicator';


export interface ReadyProps extends StepIndicatorProps {
  open: boolean;
  close: () => void;
}

export const Ready = observer(({open, close, ...rest}: ReadyProps) => {
  const {
    user: { LNWalletStep, setLNWalletStep },
  } = useAppStore();
  const [shouldShowCreateWallet, setShouldShowCreateWallet] = useState<boolean>(false);

  function onToUserGuide() {
    close();
    trackLightningSetup('skip');
    setLNWalletStep(LNWalletStepStatus.UserGuide);
  }

  function onToCreateWallet() {
    trackLightningSetup('create');
    setShouldShowCreateWallet(true);
  }

  // if(LNWalletStep !== LNWalletStepStatus.Ready){
  //   return null;
  // }

  return (
    <TransitionablePortal
      open={open}
      transition={{ animation: 'fade left', duration: '300' }}>
      <LNSetupModal open={true}>
        <LNSetupModalContent>
          <ConfettiContainer
            width={window.innerWidth}
            height={window.innerHeight}
          />
          <StepsContainer>
            <StepIndicator {...rest} />
          </StepsContainer>
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
        <CreateWallet open={shouldShowCreateWallet} close={() => { setShouldShowCreateWallet(false); }} />
      </LNSetupModal>
    </TransitionablePortal>
  );
});
