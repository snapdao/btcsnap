import React from 'react';
import { ReactComponent as FlaskIcon } from './image/MetaMaskFlask.svg';
import { ReactComponent as InstallIcon } from './image/install.svg';
import { isFirefox } from '../../lib/helper';
import { ModalContentContainer } from './styles';
import { SubCaption } from '../../kits';

interface InstallProps {
  show: boolean
}

const getFlaskInstallLink = () => {
  return isFirefox(navigator.userAgent)
    ? 'https://addons.mozilla.org/en-US/firefox/addon/metamask-flask/'
    : 'https://chrome.google.com/webstore/detail/metamask-flask-developmen/ljfoeinjpaedjfecbmggjgodbgkmjkjk';
};

const Install = ({ show }: InstallProps) => {
  return (
    <ModalContentContainer show={show}>
      <FlaskIcon className='Connect-flask-icon'/>
      <h2>Install MetaMask Flask</h2>
      <p className='Connect-install'>You will need to install the MetaMask Flask extension in order to use Bitcoin Snap.</p>
      <p className='Connect-flask'>Please disable the regular MetaMask extension prior to using flask.</p>
      <SubCaption style={{ marginBottom: 16, color: 'var(--c-n60)' }}>Refresh this page after the installation</SubCaption>
      <a
        href={getFlaskInstallLink()}
        className='Connect-button'
        target='_blank'
        rel='noopener noreferrer'
      >
        <InstallIcon />
        <span>Install MetaMask</span>
      </a>
    </ModalContentContainer>
  );
};

export default Install;
