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
  ConfettiContainer
} from "./styles"
import { useAppStore } from '../../mobx';
import { LNWalletStepStatus } from "../../mobx/user"
import CloseIcon from "../Icons/CloseIcon";

interface LastStepProps {
  open: boolean;
}

const SetupLightning = observer(({open}: LastStepProps) => {
  const { user: {setLNWalletStep}} = useAppStore();

  const useWallet = () => {
    setLNWalletStep(LNWalletStepStatus.UserGuide)
  }

  const createLightningWallets = () => {
    // TODO
  }

  return (
    <LNSetupModal open={open}>
      {open ?
        <ConfettiContainer
          width={window.innerWidth}
          height={window.innerHeight}
        />:
        <></>
      }
      <CloseContainer><CloseIcon onClick={useWallet} /></CloseContainer>
      <LastStepIcon><SendSuccess /></LastStepIcon>
      <LastStepTitle>Your Bitcoin Wallet is Ready!</LastStepTitle>
      <LastStepText>You’ve successfully setup your wallet!</LastStepText>
      <CreateButton onClick={createLightningWallets}>Create Lightning Wallets</CreateButton>
      <StartButton onClick={useWallet}>Start Using Now</StartButton>
      <div></div>
    </LNSetupModal>
  )
})

export default SetupLightning;
