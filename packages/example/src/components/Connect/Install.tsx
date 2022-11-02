import React from 'react';
import { ReactComponent as FlaskIcon } from "./image/MetaMaskFlask.svg"
import { ReactComponent as InstallIcon } from "./image/install.svg"
import Modal from "./Modal";
import { isFirefox } from "../../lib/helper";

interface InstallProps {
  open: boolean;
  close: () => void;
  isFirstStep?: boolean;
}

const getFlaskInstallLink = () => {
  return isFirefox(navigator.userAgent)
    ? 'https://addons.mozilla.org/en-US/firefox/addon/metamask-flask/'
    : 'https://chrome.google.com/webstore/detail/metamask-flask-developmen/ljfoeinjpaedjfecbmggjgodbgkmjkjk'
}

const Install = ({open, close, isFirstStep}: InstallProps) => {
  return (
    <Modal open={open} close={close} isFirstStep={isFirstStep}>
      <FlaskIcon className="Connect-flask-icon"/>
      <h2>Install MetaMask Flask</h2>
      <p className="Connect-install">You will need to install the MetaMask Flask extension in order to use Bitcoin Snap.</p>
      <p className="Connect-flask">Please disable the regular MetaMask extension prior to using flask.</p>
      <a
        href={getFlaskInstallLink()}
        className="Connect-button"
        target="_blank"
        rel="noopener noreferrer"
      >
        <InstallIcon />
        <span>Install MetaMask</span>
      </a>
    </Modal>
  );
};

export default Install;
