import React, { useCallback, useState } from 'react';
import { Loader, Modal as SModal } from 'semantic-ui-react';
import { ReactComponent as ConnectIcon } from './image/connect.svg';
import { ReactComponent as MetaMaskIcon } from './image/MetaMask.svg';
import ArrowRight from '../Icons/ArrowRight';
import { connect } from '../../lib/snap';
import { trackConnectClick, trackConnectSucceed } from '../../tracking';
import { ModalContentContainer } from './styles';

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
        <ConnectIcon className='Connect-flask-icon'/>
        <h2>Connect to MetaMask Bitcoin Snap</h2>
        <p className='Connect-install'>
          If you do not have Bitcoin Snap installed, you will be prompted to do
          so.
        </p>
        <a
          href='https://docs.metamask.io/guide/snaps.html#what-is-snaps'
          className='Connect-snap-link'
          target='_blank'
          rel='noopener noreferrer'>
          What is Snaps
          <span>
            <ArrowRight size={18}/>
          </span>
        </a>
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
