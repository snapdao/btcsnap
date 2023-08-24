import React, { useCallback, useState } from 'react';
import { Loader, Modal as SModal } from 'semantic-ui-react';
import { ReactComponent as ConnectIcon } from './image/connect.svg';
import { ReactComponent as MetaMaskIcon } from './image/MetaMask.svg';
import ArrowRight from '../Icons/ArrowRight';
import { connect } from '../../lib/snap';
import { trackConnectClick, trackConnectSucceed } from '../../tracking';
import { ModalContentContainer } from './styles';
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
        <h2>Connect to MetaMask Bitcoin Snap</h2>
        <p className='Connect-install'>
          If you do not have Bitcoin Snap installed, you will be prompted to do
          so.
        </p>
        <div style={{ flex: 1, alignItems: 'flex-start' }}>
          <Link href='https://docs.metamask.io/guide/snaps.html#what-is-snaps'>
            What is Snaps
          </Link>
        </div>
        <button
          className='Connect-button'
          disabled={isConnecting}
          onClick={connectMetaMask}
        >
          <MetaMaskIcon/>
          <span>Connect MetaMask</span>
        </button>
      </ModalContentContainer>
      <SModal open={isConnecting}>
        <Loader inverted content={'Continue at MetaMask'} />
      </SModal>
    </>
  );
};

export default Connect;
