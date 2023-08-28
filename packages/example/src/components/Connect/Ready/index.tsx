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
import { useState } from 'react';
import CreateWallet from '../../Lightning/CreateWallet';
import { ModalContentContainer } from '../styles';

export const Ready = observer(({ show, onClose }: {show: boolean; onClose: () => void}) => {
  const [shouldShowCreateWallet, setShouldShowCreateWallet] = useState<boolean>(false);

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
          <StartButton primary onClick={onClose}>
              Start Using Zion
          </StartButton>
        </ButtonsContainer>
      </LNSetupModalContent>
      <CreateWallet open={shouldShowCreateWallet} close={() => { setShouldShowCreateWallet(false); }} />
    </ModalContentContainer>
  );
});
