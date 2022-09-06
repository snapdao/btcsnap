import React, { useCallback, useEffect, useRef, useState } from 'react';
import { observer } from "mobx-react-lite";
import Install from "./Install";
import Connect from "./Connect";
import RevealXpub  from "./RevealXpub";
import { useKeystoneStore } from "../../mobx";
import "./index.css"

const Index = observer(() => {
  const { global: { connected, updateConnectionStatus }, current } = useKeystoneStore();
  const hasInstalled = !!window.ethereum;
  const [hasConnected, setHasConnected] = useState<boolean>(connected);
  const [hasRevealed, setHasRevealed] = useState<boolean>(!!current?.xpub);

  const onConnected = useCallback(async () => {
    setHasConnected(true);
    updateConnectionStatus(true);
  }, [setHasConnected]);
  
  const onRevealed = useCallback(() => {
    setHasRevealed(true)
  }, [setHasRevealed])

  useEffect(() => {
    if (!current?.xpub) {
      setHasConnected(connected);
      setHasRevealed(false);
    }
  }, [current?.xpub, connected, setHasConnected, setHasRevealed])

  return (
    <>
      <Install open={!hasInstalled}/>
      <Connect open={hasInstalled && !hasConnected} onConnected={onConnected}/>
      <RevealXpub open={hasConnected && !hasRevealed} onRevealed={onRevealed}/>
    </>
  );
});

export default Index;
