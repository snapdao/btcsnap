import React, { useCallback, useState } from 'react';
import { observer } from 'mobx-react-lite';
import Install from './Install';
import Connect from './Connect';
import { GetAddress } from './GetAddress';
import { useAppStore } from '../../mobx';
import './index.css';
import { AppStatus } from '../../mobx/runtime';
import { Ready } from './Ready';
import Modal from './Modal';
import { StyledBrowsers, ConnectStepsContainer, StepViewContainer } from './styles';
import { useConnectStep } from './useConnectStep';
import { trackLightningSetup } from '../../tracking';
import { LNWalletStepStatus } from '../../mobx/user';

export enum ConnectStep {
  Browser,
  Install,
  Connect,
  Reveal,
  Ready,
  Done
}

const Index = observer(() => {
  const {
    runtime: { status, setStatus, setConnected },
    user: { setLNWalletStep, LNWalletStep },
  } = useAppStore();
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const { step, setStep, currentStepIndex, totalStep } = useConnectStep();

  const closeModal = useCallback(() => {
    if(step === ConnectStep.Ready) {
      trackLightningSetup('skip');
      setLNWalletStep(LNWalletStepStatus.UserGuide);
      setStep(ConnectStep.Done);
    } else {
      setStatus(AppStatus.ConnectClosed);  
    }
  }, [step]);

  if(status === AppStatus.ConnectClosed){
    return null;
  }

  if(step === ConnectStep.Browser) {
    return (
      <StyledBrowsers list={['chrome', 'firefox', 'brave']} open={step === ConnectStep.Browser} close={closeModal} />
    );
  }

  return (
    <Modal
      open={step !== ConnectStep.Done}
      close={closeModal}
      totalStep={totalStep.current}
      currentStep={currentStepIndex}
      isDisabled={isDisabled}
    >
      <StepViewContainer>
        <ConnectStepsContainer index={step}>
          <Install
            show={step === ConnectStep.Install}
          />
          <Connect
            show={step === ConnectStep.Connect}
            onConnected={() => {
              setStep(ConnectStep.Reveal);
              setConnected(true);
            }}/>
          <GetAddress
            show={step === ConnectStep.Reveal}
            onRegister={setIsDisabled}
            onRevealed={() => {
              if(LNWalletStep === LNWalletStepStatus.Default) {
                setLNWalletStep(LNWalletStepStatus.Ready);
                setStep(ConnectStep.Ready);
              } else {
                setStep(ConnectStep.Done);
              }
            }}
          />
          <Ready
            show={step === ConnectStep.Ready}
            onClose={() => {
              setLNWalletStep(LNWalletStepStatus.Done);
              setStep(ConnectStep.Done);
            }}
          />
        </ConnectStepsContainer>
      </StepViewContainer>
    </Modal>
  );
});

export default Index;
