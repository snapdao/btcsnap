import React, { useCallback, useState } from 'react';
import ConnectIcon from "./image/connect.svg"
import MetaMaskIcon from "./image/MetaMask.svg"
import Modal from "./Modal";
import { BitcoinNetwork } from "../../interface";
import { getExtendedPublicKey } from "../../lib/snap";
import { setConnectedExtendedPublicKey } from "../../lib/connect";

export interface RevealXpubProps {
  open: boolean;
  network: BitcoinNetwork;
  onRevealed: (pubKey: string) => void;
}

const RevealXpub = ({open, network, onRevealed}: RevealXpubProps) => {
  const [isRevealing, setIsRevealing] = useState<boolean>(false);

  const getXpub = useCallback(async () => {
    setIsRevealing(true);
    getExtendedPublicKey(network, (xpub: string) => {
      setIsRevealing(false);
      if (xpub) {
        onRevealed(xpub);
        setConnectedExtendedPublicKey(xpub, network)
      }
    })
  }, [setIsRevealing, network])

  return (
    <Modal open={open}>
      <img src={ConnectIcon} alt="MetaMaskFlask" className="Connect-flask-icon"/>
      <h2>Reveal Addresses for Bitcoin Snap</h2>
      <p style={{ marginBottom: 100}} className="Connect-install">Your Bitcoin account addresses will be created along with your MetaMask public key.</p>
      <button className="Connect-button" disabled={isRevealing} onClick={getXpub}>
        <img src={MetaMaskIcon} alt="Install"/>
        <span>Get Addresses</span>
      </button>
    </Modal>
  );
};

export default RevealXpub;
