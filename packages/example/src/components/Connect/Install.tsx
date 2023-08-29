import React from 'react';
import { ReactComponent as MetaMaskIcon } from './image/MetaMaskLogo.svg';
import { ReactComponent as InstallIcon } from './image/install.svg';
import { isFirefox } from '../../lib/helper';
import { ModalContentContainer, StyledConnectButton } from './styles';
import { SubCaption } from '../../kits';
import { Link } from '../../kits/Link';

interface InstallProps {
  show: boolean
}

const getMetaMaskExtensionInstallLink = () => {
  return isFirefox(navigator.userAgent)
    ? 'https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/'
    : 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn';
};

const Install = ({ show }: InstallProps) => {
  return (
    <ModalContentContainer show={show}>
      <MetaMaskIcon className='Connect-MM-icon'/>
      <h2>Install MetaMask</h2>
      <p className='Connect-install'>You will need to install the MetaMask extension in order to use Zion.</p>
      <div style={{ flex: 1, alignItems: 'flex-start' }}>
        <Link href='https://metamask.io/'>Learn More</Link>
      </div>
      <SubCaption style={{ marginBottom: 16, color: 'var(--c-n60)' }}>Refresh this page after the installation</SubCaption>
      <StyledConnectButton
        as='a'
        href={getMetaMaskExtensionInstallLink()}
        target='_blank'
        rel='noopener noreferrer'
      >
        <InstallIcon />
        <span>Install MetaMask</span>
      </StyledConnectButton>
    </ModalContentContainer>
  );
};

export default Install;
