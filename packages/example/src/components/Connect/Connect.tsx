import React, { useCallback, useState } from 'react';
import { ReactComponent as ConnectIcon } from "./image/connect.svg"
import { ReactComponent as  MetaMaskIcon } from "./image/MetaMask.svg"
import ArrowRight from "../Icons/ArrowRight"
import Modal from "./Modal";
import { connect } from "../../lib/snap";
import { trackConnectClick, trackConnectSucceed } from "../../tracking";

interface ConnectProps {
  open: boolean;
  onConnected: () => void;
}

const Connect = ({open, onConnected}: ConnectProps) => {
  const [isConnecting, setIsConnecting] = useState<boolean>(false);

  const connectMetaMask = useCallback(async () => {
    setIsConnecting(true);
    trackConnectClick();

    connect((connected: boolean) => {
      setIsConnecting(false);
      if(connected) {
        onConnected();
        trackConnectSucceed();
      }
    });
  }, [setIsConnecting, onConnected])

  return (
    <Modal open={open}>
      <ConnectIcon className="Connect-flask-icon" />
      <h2>Connect to MetaMask Bitcoin Snap</h2>
      <p className="Connect-install">If you do not have Bitcoin Snap installed, you will be prompted to do so.</p>
      <a 
        href="https://docs.metamask.io/guide/snaps.html#what-is-snaps"
        className="Connect-snap-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        What is Snaps
        <ArrowRight size={18}/>
      </a>
      <button className="Connect-button" disabled={isConnecting} onClick={connectMetaMask}>
        <MetaMaskIcon />
        <span>Connect MetaMask</span>
      </button>
    </Modal>
  );
};

export default Connect;
