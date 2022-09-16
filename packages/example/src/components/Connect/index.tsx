import React, { useEffect, useState } from 'react';
import { observer } from "mobx-react-lite";
import Install from "./Install";
import Connect from "./Connect";
import RevealXpub  from "./RevealXpub";
import { useKeystoneStore } from "../../mobx";
import "./index.css"

enum ConnectStep {
  Install,
  Connect,
  Reveal,
  Done
}

const Index = observer(() => {
  const { current, persistDataLoaded, runtime: {connected, setConnected} } = useKeystoneStore();
  const [step, setStep] = useState<ConnectStep>(ConnectStep.Done);

  useEffect(() => {
    if(!persistDataLoaded){
      return;
    }
    let nextStep = !!current ? ConnectStep.Done : (connected ? ConnectStep.Reveal : ConnectStep.Connect);
    const notInstalled = !window.ethereum;
    if(notInstalled) {
      nextStep = ConnectStep.Install;
    }
    setStep(nextStep);
  }, [current, setStep, persistDataLoaded])

  return (
    <>
      <Install open={step === ConnectStep.Install}/>
      <Connect
        open={step === ConnectStep.Connect}
        onConnected={() => {
          setStep(ConnectStep.Reveal);
          setConnected(true);
        }}/>
      <RevealXpub open={step === ConnectStep.Reveal} onRevealed={() => {setStep(ConnectStep.Done)}}/>
    </>
  );
});

export default Index;
