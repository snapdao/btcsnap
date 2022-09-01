import React, { useCallback, useState } from 'react';
import { ReactComponent as ConnectIcon } from "./image/connect.svg"
import { ReactComponent as MetaMaskIcon } from "./image/MetaMask.svg"
import Modal from "./Modal";
import { getExtendedPublicKey } from "../../lib/snap";
import { useKeystoneStore } from "../../mobx";
import { updateStoredXpub } from "../../lib/globalStorage";
import { trackGetAddress } from "../../tracking";

export interface RevealXpubProps {
  open: boolean;
  onRevealed: () => void;
}

const RevealXpub = ({open, onRevealed}: RevealXpubProps) => {
  const { global: { network, scriptType, updateBip44Xpub }} = useKeystoneStore();
  const [isRevealing, setIsRevealing] = useState<boolean>(false);

  const getXpub = useCallback(async () => {
    setIsRevealing(true);
    getExtendedPublicKey(network, scriptType, ({xpub, mfp}) => {
      if (xpub) {
        updateBip44Xpub(xpub);
        updateStoredXpub(xpub, network);
        trackGetAddress(network);
        onRevealed();
      }
      setIsRevealing(false);
    })
  }, [setIsRevealing, network, updateBip44Xpub])

  return (
    <Modal open={open}>
      <ConnectIcon className="Connect-flask-icon" />
      <h2>Get Addresses for <br/> Bitcoin Snap</h2>
      <p style={{ marginBottom: 100}} className="Connect-install">Your Bitcoin account addresses will be created along with your MetaMask public key.</p>
      <button className="Connect-button" disabled={isRevealing} onClick={getXpub}>
        <MetaMaskIcon />
        <span>Get Addresses</span>
      </button>
    </Modal>
  );
};

export default RevealXpub;
