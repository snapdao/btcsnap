import React, { useCallback, useState } from 'react';
import ConnectIcon from "./image/connect.svg"
import MetaMaskIcon from "./image/MetaMask.svg"
import ArrowRight from "../Icons/ArrowRight"
import Modal from "./Modal";
import { connect } from "../../lib/snap";

interface ConnectProps {
  open: boolean;
  onConnected: () => void;
}

const Connect = ({open, onConnected}: ConnectProps) => {
  const [isConnecting, setIsConnecting] = useState<boolean>(false);

  const connectMetaMask = useCallback(async () => {
    setIsConnecting(true);
    connect((connected: boolean) => {
      setIsConnecting(false);
      if(connected) {
        onConnected();
      }
    });
  }, [setIsConnecting, onConnected])

  return (
    <Modal open={open}>
      <img src={ConnectIcon} alt="MetaMaskFlask" className="Connect-flask-icon"/>
      <h2>Connect to MetaMask Bitcoin Snap</h2>
      <p className="Connect-install">If you do not have Bitcoin Snap installed, you will be prompted to do so.</p>
      <a 
        href="https://docs.metamask.io/guide/snaps.html#what-is-snaps"
        className="Connect-snap-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        What is a Snap
        <ArrowRight />
      </a>
      <button className="Connect-button" disabled={isConnecting} onClick={connectMetaMask}>
        <img src={MetaMaskIcon} alt="Install"/>
        <span>Connect MetaMask</span>
      </button>
    </Modal>
  );
};

export default Connect;
