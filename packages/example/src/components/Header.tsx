import React from 'react';
import { Container, Header,Icon } from 'semantic-ui-react'
import { MetaMaskInpageProvider } from '@metamask/providers';

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

const { ethereum } = window;
const snapId = 'npm:btcsnap';

async function connect() {
  await ethereum.request({
    method: 'wallet_enable',
    params: [
      {
        wallet_snap: { 'npm:btcsnap': {} },
      },
    ],
  });
}

type HeaderProps = {
  setConnectStaus: (status: boolean) => void;
  connected: boolean;
};

export const PageHeader = () => {
  return (
    <Icon name='home' size='large' />
  );
};
