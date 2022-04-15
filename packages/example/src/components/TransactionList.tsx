import { useState } from 'react';
import {
  Table,
  Menu,
  Icon,
  Dimmer,
  Loader,
  Segment,
  Image,
  Container,
  Label,
} from 'semantic-ui-react';
import { BitcoinNetwork } from '../interface';

export type ListProps = {
  items: { txId: string; status: string; blocknumber: string | undefined }[];
  network: BitcoinNetwork;
};

const getLink = (txId: string, network: BitcoinNetwork) =>
  network === BitcoinNetwork.Main
    ? `https://blockstream.info/tx/${txId}`
    : `https://blockstream.info/testnet/tx/${txId}`;

const renderBody = (
  items: ListProps['items'],
  pageCount: number,
  index: number,
  total: number,
  network: BitcoinNetwork,
) => {
  const showList = [];
  for (let i = 0; i < pageCount; i++) {
    if (i + pageCount * index < total) {
      showList.push(items[i + pageCount * index]);
    }
  }

  return (
    <Table.Body>
      {showList.map((each) => (
        <Table.Row key={each.txId}>
          <Table.Cell>
            <a href={getLink(each.txId, network)} target="_blank">{each.txId}</a>
          </Table.Cell>
          <Table.Cell>{each.status}</Table.Cell>
          <Table.Cell>{each.blocknumber}</Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  );
};

const renderLoading = () => (
  <Container>
    <Segment>
      <Dimmer active inverted>
        <Loader size="large">Loading</Loader>
      </Dimmer>

      <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
    </Segment>
  </Container>
);

const renderFooter = (index: number, max: number, setIndex: Function) => {
  return (
    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan="3" center>
          <Menu floated="right" pagination>
            <Menu.Item
              as="a"
              icon
              disabled={index <= 0}
              onClick={() => setIndex(index - 1)}>
              <Icon name="chevron left" />
            </Menu.Item>
            <Menu.Item
              as="a"
              icon
              disabled={index >= max}
              onClick={() => setIndex(index + 1)}>
              <Icon name="chevron right" />
            </Menu.Item>
          </Menu>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  );
};

export const TransactionList = (props: ListProps) => {
  const [index, setIndex] = useState(0);
  const pageCount = 5;

  const shouldShowFooter = () => props.items.length > pageCount;
  const max = Math.floor(props.items.length / pageCount);
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>TxID</Table.HeaderCell>
          <Table.HeaderCell>Status</Table.HeaderCell>
          <Table.HeaderCell>Block Number</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body></Table.Body>
      {renderBody(
        props.items,
        pageCount,
        index,
        props.items.length,
        props.network,
      )}
      {shouldShowFooter() ? renderFooter(index, max, setIndex) : null}
    </Table>
  );
};
