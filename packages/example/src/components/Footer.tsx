import React from 'react';
import { Container, Header, Icon } from 'semantic-ui-react';

export const PageFooter = () => {
  return (
    <Container>
      <Header as="h2" textAlign="center" color="grey">
        <Header.Content>
          <a href="https://github.com/KeystoneHQ/btcsnap" target="_blank">
            <Icon name="github" size="large" />
          </a>
        </Header.Content>
        <Header.Subheader>
          By{' '}
          <a href="https://twitter.com/aaron1sme" target="_blank">
            Aaron Chen
          </a>{' '}
          @{' '}
          <a href="https://twitter.com/KeystoneWallet" target="_blank">
            Keystone Wallet
          </a>
        </Header.Subheader>
      </Header>
    </Container>
  );
};
