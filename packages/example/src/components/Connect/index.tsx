import React, { useCallback, useEffect, useState } from 'react';
import Install from "./Install";
import Connect from "./Connect";
import RevealXpub  from "./RevealXpub";
import { getConnectedExtendedPublicKey } from "../../lib/connect";
import { BitcoinNetwork } from "../../interface";
import "./index.css"

interface Props {
  network: BitcoinNetwork;
  onXpubRevealed: (pubKey: string) => void;
}

const Index = ({network, onXpubRevealed}: Props) => {
  const [hasInstalled, setHasInstalled] = useState<boolean>(false);
  const [hasConnected, setHasConnected] = useState<boolean>(false);
  const [hasRevealed, setHasRevealed] = useState<boolean>(false);

  useEffect(() => {
    setHasInstalled(!!window.ethereum);
    const connectedXpub = getConnectedExtendedPublicKey(network);
    if (connectedXpub) {
      setHasConnected(true);
      setHasRevealed(true);
      onXpubRevealed(connectedXpub);
    }
  }, []);

  const onConnected = useCallback(async () => {
    setHasConnected(true);
  }, [setHasConnected]);
  
  const onRevealed = useCallback((pubkey) => {
    onXpubRevealed(pubkey)
    setHasRevealed(true)
  }, [setHasRevealed])

  return (
    <>
      <Install open={!hasInstalled}/>
      <Connect open={hasInstalled && !hasConnected} onConnected={onConnected}/>
      <RevealXpub 
        open={hasConnected && !hasRevealed}
        network={network}
        onRevealed={onRevealed}/>
    </>
  );
};

export default Index;
