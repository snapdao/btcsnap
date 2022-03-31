import React from 'react';
import './Header.css';
import {
  Container,
  Header,
  Icon,
  Button,
  Grid,
  Segment,
} from 'semantic-ui-react';
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
    <Container>
      <Grid columns="equal">
        <Grid.Column width={12}>
          <Header as="h1">
            <Icon name="bitcoin" size="large" color="orange" />
            <Header.Content>
              BitcoinSnap
              <Header.Subheader>
                Manage your bitcoin with Metamask Flask and Btcsnap
              </Header.Subheader>
            </Header.Content>
          </Header>
        </Grid.Column>
        <Grid.Column>
          <Button primary size="big">Connect Metamask</Button>
        </Grid.Column>
      </Grid>
    </Container>
  );
};
