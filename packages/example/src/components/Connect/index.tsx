import React, { useCallback, useEffect, useState } from 'react';
import { observer } from "mobx-react-lite";
import Install from "./Install";
import Connect from "./Connect";
import RevealXpub  from "./RevealXpub";
import { useKeystoneStore } from "../../mobx";
import "./index.css";
import { Browsers } from "snapkit";
import { isBrowserSupport } from '../../lib/helper';
import { AppStatus } from '../../mobx/runtime';

enum ConnectStep {
  Browser,
  Install,
  Connect,
  Reveal,
  Done
}

const Index = observer(() => {
  const isBrowserSupported = isBrowserSupport(navigator.userAgent);
  const {
    current,
    persistDataLoaded,
    runtime: {status, setStatus, connected, setConnected}
  } = useKeystoneStore();
  const [step, setStep] = useState<ConnectStep>(ConnectStep.Done);

  useEffect(() => {
    if(!persistDataLoaded){
      return;
    }

    if(!isBrowserSupported) {
      setStep(ConnectStep.Browser);
      return;
    }

    let nextStep = !!current ? ConnectStep.Done : (connected ? ConnectStep.Reveal : ConnectStep.Connect);
    const notInstalled = !window.ethereum;
    if(notInstalled) {
      nextStep = ConnectStep.Install;
    }
    setStep(nextStep);
  }, [current, setStep, persistDataLoaded])

  const closeModal = useCallback(() => {
    setStatus(AppStatus.ConnectClosed);
  }, [])

  if(status === AppStatus.ConnectClosed){
    return null;
  }

  return (
    <>
      <Browsers open={step === ConnectStep.Browser} close={closeModal} />
      <Install open={step === ConnectStep.Install} close={closeModal} />
      <Connect
        open={step === ConnectStep.Connect}
        close={closeModal}
        onConnected={() => {
          setStep(ConnectStep.Reveal);
          setConnected(true);
        }}/>
      <RevealXpub
        open={step === ConnectStep.Reveal}
        close={closeModal}
        onRevealed={() => {setStep(ConnectStep.Done)}}
      />
    </>
  );
});

export default Index;
