import React from 'react';
import { observer } from "mobx-react-lite";
import { ReactComponent as SendSuccess } from '../../assets/send_success.svg';
import {
  LNSetupModal,
  CloseContainer,
  LastStepIcon,
  LastStepTitle,
  LastStepText,
  CreateButton,
  StartButton,
  ConfettiContainer, LNSetupModalContent,
  ButtonsContainer
} from "./styles"
import { useAppStore } from '../../mobx';
import { LNWalletStepStatus } from "../../mobx/user"
import CloseIcon from "../Icons/CloseIcon";

const SetupLightning = observer(() => {
  const {user: {setLNWalletStep}} = useAppStore();

  const useWallet = () => {
    setLNWalletStep(LNWalletStepStatus.UserGuide)
  }

  const createLightningWallets = () => {
    // TODO
  }

  return (
    <LNSetupModal open={true}>
      <LNSetupModalContent>
        <ConfettiContainer
          width={window.innerWidth}
          height={window.innerHeight}
        />
        <CloseContainer><CloseIcon onClick={useWallet}/></CloseContainer>
        <LastStepIcon><SendSuccess/></LastStepIcon>
        <LastStepTitle>Your Bitcoin Wallet is Ready!</LastStepTitle>
        <LastStepText>You’ve successfully setup your wallet!</LastStepText>
        <ButtonsContainer>
          <CreateButton onClick={createLightningWallets}>Create Lightning Wallets</CreateButton>
          <span>or</span>
          <StartButton primary onClick={useWallet}>Start Using Now</StartButton>
        </ButtonsContainer>

      </LNSetupModalContent>
    </LNSetupModal>
  )
})

export default SetupLightning;