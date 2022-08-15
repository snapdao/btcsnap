import React, { useCallback, useState } from 'react';
import ConnectIcon from "./image/connect.svg"
import MetaMaskIcon from "./image/MetaMask.svg"
import Modal from "./Modal";
import { getExtendedPublicKey } from "../../lib/snap";
import { useKeystoneStore } from "../../mobx";

export interface RevealXpubProps {
  open: boolean;
  onRevealed: () => void;
}

const RevealXpub = ({open, onRevealed}: RevealXpubProps) => {
  const { global: { network, updateBip44Xpub }} = useKeystoneStore();
  const [isRevealing, setIsRevealing] = useState<boolean>(false);

  const getXpub = useCallback(async () => {
    setIsRevealing(true);
    getExtendedPublicKey(network, (xpub: string) => {
      if (xpub) {
        updateBip44Xpub(xpub);
        onRevealed();
      }
      setIsRevealing(false);
    })
  }, [setIsRevealing, network, updateBip44Xpub])

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
