import { observer } from 'mobx-react-lite';
import { ReactComponent as SendSuccess } from '../../../assets/send_success.svg';
import {
  LastStepIcon,
  LastStepTitle,
  LastStepText,
  StartButton,
  ConfettiContainer,
  LNSetupModalContent,
  ButtonsContainer,
} from './styles';
import { useAppStore } from '../../../mobx';
import { LNWalletStepStatus } from '../../../mobx/user';
import { useState } from 'react';
import CreateWallet from '../../Lightning/CreateWallet';
import { AddLightningWallet } from '../../WalletList/AddLightningWallet';
import { trackLightningSetup } from '../../../tracking';
import { ModalContentContainer } from '../styles';

export const Ready = observer(({ show, onClose }: {show: boolean; onClose: () => void}) => {
  const {
    user: { setLNWalletStep },
  } = useAppStore();
  const [shouldShowCreateWallet, setShouldShowCreateWallet] = useState<boolean>(false);

  function onToUserGuide() {
    trackLightningSetup('skip');
    setLNWalletStep(LNWalletStepStatus.UserGuide);
    onClose();
  }

  function onToCreateWallet() {
    trackLightningSetup('create');
    setShouldShowCreateWallet(true);
  }

  return (
    <ModalContentContainer show={show}>
      <LNSetupModalContent>
        {
          show && (
            <ConfettiContainer
              width={window.innerWidth}
              height={window.innerHeight}
            />
          )
        }
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
    </ModalContentContainer>
  );
});
