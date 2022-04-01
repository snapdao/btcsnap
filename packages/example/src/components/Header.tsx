import React from 'react';
import {
  Container,
  Header,
  Icon,
  Button,
  Grid,
  Segment,
} from 'semantic-ui-react';
import { MetaMaskInpageProvider } from '@metamask/providers';

type HeaderProps = {
  onConnect: Function;
  connected: boolean;
};

export const PageHeader = ({ onConnect, connected }: HeaderProps) => {
  return (
    <Container>
      <Grid columns="equal">
        <Grid.Column width={12}>
          <Header as="h1">
            <Icon name="bitcoin" size="large" color="orange" />
            <Header.Content>
              BitcoinSnap
              <Header.Subheader>
                Manage your bitcoin with Metamask Flask and btcsnap
              </Header.Subheader>
            </Header.Content>
          </Header>
        </Grid.Column>
        <Grid.Column>
          <Button
            primary={!connected}
            disabled={connected}
            size="big"
            onClick={(e) => onConnect()}>
            {connected ? 'Connected' : 'Connect Metamask'}
          </Button>
        </Grid.Column>
      </Grid>
    </Container>
  );
};
