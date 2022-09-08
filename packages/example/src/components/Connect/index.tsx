import React, { useCallback, useEffect, useRef, useState } from 'react';
import { observer } from "mobx-react-lite";
import Install from "./Install";
import Connect from "./Connect";
import RevealXpub  from "./RevealXpub";
import { useKeystoneStore } from "../../mobx";
import "./index.css"

const Index = observer(() => {
  const { current } = useKeystoneStore();
  const hasInstalled = !!window.ethereum;
  const [hasConnected, setHasConnected] = useState<boolean>(!!current);
  const [hasRevealed, setHasRevealed] = useState<boolean>(!!current);

  const onConnected = useCallback(async () => {
    setHasConnected(true);
  }, [setHasConnected]);
  
  const onRevealed = useCallback(() => {
    setHasRevealed(true)
  }, [setHasRevealed])

  useEffect(() => {
    if (!current) {
      setHasConnected(true);
      setHasRevealed(false);
    }
  }, [current, setHasConnected, setHasRevealed])

  return (
    <>
      <Install open={!hasInstalled}/>
      <Connect open={hasInstalled && !hasConnected} onConnected={onConnected}/>
      <RevealXpub open={hasConnected && !hasRevealed} onRevealed={onRevealed}/>
    </>
  );
});

export default Index;
