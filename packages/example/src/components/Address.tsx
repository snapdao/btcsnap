import { useState } from 'react';
import {
  Menu,
  Grid,
  Segment,
  Header,
  Dropdown,
  Button,
  Divider
} from 'semantic-ui-react';
import { BitcoinNetwork } from '../interface';
import { AddressList } from './AddressList';
import { ListProps } from './AddressList'

const NetworkOptions = [
  { key: 1, text: 'Mainnet', value: BitcoinNetwork.Main },
  { key: 2, text: 'Testnet', value: BitcoinNetwork.Test },
];

const ScriptTypeOptions = [{ key: 1, text: 'P2PKH', value: 1 }];

export const Address = ({
  onGetPubkey,
  network,
  setNetwork,
  items,
  loading
}: {
  onGetPubkey: Function;
  setNetwork: Function;
  network: BitcoinNetwork;
  items: ListProps["items"]
  loading: boolean
}) => {
  return (
    <Segment>
      <Header as="h2">Address</Header>
      <Grid columns="equal">
        <Grid.Column width={3}>
          <Menu compact>
            <Dropdown
              placeholder="Network"
              options={NetworkOptions}
              selection
              value={network}
              onChange={(e, data) => {
                setNetwork(data.value);
              }}
            />
          </Menu>
        </Grid.Column>
        <Grid.Column width={9}></Grid.Column>
        {/* <Grid.Column width={3}>
          <Menu compact>
            <Dropdown
              placeholder="ScripType"
              options={ScriptTypeOptions}
              selection
            />
          </Menu>
        </Grid.Column> */}
        <Grid.Column width={4}>
          <Button secondary onClick={e => onGetPubkey()}>Get ExtendedPubKey</Button>
        </Grid.Column>
      </Grid>
      <Divider hidden />
      <AddressList items={items} loading={loading} />
    </Segment>
  );
};
