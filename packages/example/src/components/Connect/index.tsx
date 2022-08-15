import React, { useCallback, useState } from 'react';
import Install from "./Install";
import Connect from "./Connect";
import RevealXpub  from "./RevealXpub";
import { useKeystoneStore } from "../../mobx";
import "./index.css"

const Index = () => {
  const { global: { bip44Xpub: pubKey }} = useKeystoneStore();
  const hasInstalled = !!window.ethereum;
  const [hasConnected, setHasConnected] = useState<boolean>(!!pubKey);
  const [hasRevealed, setHasRevealed] = useState<boolean>(!!pubKey);

  const onConnected = useCallback(async () => {
    setHasConnected(true);
  }, [setHasConnected]);
  
  const onRevealed = useCallback(() => {
    setHasRevealed(true)
  }, [setHasRevealed])

  return (
    <>
      <Install open={!hasInstalled}/>
      <Connect open={hasInstalled && !hasConnected} onConnected={onConnected}/>
      <RevealXpub open={hasConnected && !hasRevealed} onRevealed={onRevealed}/>
    </>
  );
};

export default Index;
