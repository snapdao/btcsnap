import { useEffect, useRef, useState } from 'react';
import { useAppStore } from '../../mobx';
import { isBrowserSupport } from '../../lib/helper';
import { LNWalletStepStatus } from '../../mobx/user';
import { ConnectStep } from './index';

export const useConnectStep = () => {
  const {
    current,
    persistDataLoaded,
    runtime: { connected },
    user: { LNWalletStep }
  } = useAppStore();
  const [step, setStep] = useState<ConnectStep>(ConnectStep.Done);
  const [shouldShowReady, setShouldShowReady] = useState<boolean>(false);
  const totalStep = useRef<number>(0);
  const currentStepIndex = (step + totalStep.current + 1) - ConnectStep.Done + (shouldShowReady ? 0 : 1);
  
  useEffect(() => {
    if(!!current && totalStep.current > 0){
      return;
    }

    if(!isBrowserSupport(navigator.userAgent)) {
      setStep(ConnectStep.Browser);
      return;
    }

    if(!persistDataLoaded){
      return;
    }

    const shouldShowAccountReady = !!current && LNWalletStep === LNWalletStepStatus.Ready;
    const hasComplete = !!current && !shouldShowAccountReady;

    let nextStep = ConnectStep.Done;
    if (!hasComplete) {
      if(shouldShowAccountReady) {
        nextStep = ConnectStep.Ready;
      } else if(connected){
        nextStep = ConnectStep.Reveal;
      } else {
        nextStep = ConnectStep.Connect;
      }
    }
    const notInstalled = !window.ethereum;
    if(notInstalled) {
      nextStep = ConnectStep.Install;
    }
    setStep(nextStep);

    totalStep.current = ConnectStep.Done - nextStep;
    const shouldShowReady = LNWalletStep === LNWalletStepStatus.Default || LNWalletStep === LNWalletStepStatus.Ready;
    setShouldShowReady(shouldShowReady);
    if(!shouldShowReady){
      totalStep.current -= 1;
    }
  }, [current, setStep, persistDataLoaded, LNWalletStep]);
  
  return {
    step,
    setStep,
    currentStepIndex,
    totalStep
  };
};
