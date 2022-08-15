import React from 'react';
import FlaskIcon from "./image/MetaMaskFlask.svg"
import InstallIcon from "./image/install.svg"
import Modal from "./Modal";

const Install = ({open}: {open: boolean}) => {
  return (
    <Modal open={open}>
      <img src={FlaskIcon} alt="MetaMaskFlask" className="Connect-flask-icon"/>
      <h2>Install MetaMask Flask</h2>
      <p className="Connect-install">You need to install the MetaMask Flask extension in order to use Bitcoin Snap.</p>
      <p className="Connect-flask">Please disabled the regular MetaMask extension when using flask version</p>
      <a
        href="https://chrome.google.com/webstore/detail/metamask-flask-developmen/ljfoeinjpaedjfecbmggjgodbgkmjkjk"
        className="Connect-button"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={InstallIcon} alt="Install"/>
        <span>Install MetaMask</span>
      </a>
    </Modal>
  );
};

export default Install;
