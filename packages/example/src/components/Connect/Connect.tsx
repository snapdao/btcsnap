import React, { useCallback, useState } from 'react';
import { Loader, Modal as SModal } from 'semantic-ui-react';
import { ReactComponent as ConnectIcon } from './image/connect.svg';
import { ReactComponent as MetaMaskIcon } from './image/MetaMaskLogo.svg';
import { connect } from '../../lib/snap';
import { trackConnectClick, trackConnectSucceed } from '../../tracking';
import { ConnectButton, ModalContentContainer } from './styles';
import { Link } from '../../kits/Link';

interface ConnectProps {
  show: boolean;
  onConnected: () => void;
}

const Connect = ({ onConnected, show }: ConnectProps) => {
  const [isConnecting, setIsConnecting] = useState<boolean>(false);

  const connectMetaMask = useCallback(async () => {
    setIsConnecting(true);
    trackConnectClick();

    connect((connected: boolean) => {
      setIsConnecting(false);
      if (connected) {
        onConnected();
        trackConnectSucceed();
      }
    });
  }, [setIsConnecting, onConnected]);

  return (
    <>
      <ModalContentContainer show={show}>
        <ConnectIcon className='Connect-MM-icon'/>
        <h2>Connect to Zion: MetaMask Bitcoin snap</h2>
        <p className='Connect-install'>
          If you do not have btcsnap installed, you will be prompted to do
          so.
        </p>
        <div style={{ flex: 1, alignItems: 'flex-start' }}>
          <Link href='https://docs.metamask.io/guide/snaps.html#what-is-snaps'>
            What is Snaps
          </Link>
        </div>
        <ConnectButton
          disabled={isConnecting}
          onClick={connectMetaMask}
        >
          <MetaMaskIcon width={25} height={25}/>
          <span>Connect MetaMask</span>
        </ConnectButton>
      </ModalContentContainer>
      <SModal open={isConnecting}>
        <Loader inverted content={'Continue at MetaMask'} />
      </SModal>
    </>
  );
};

export default Connect;
