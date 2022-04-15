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

export type ListProps = {
  items: { path: string; address: string; count: number }[];
  loading: boolean;
  balance: number;
};

const renderBody = (
  items: ListProps['items'],
  pageCount: number,
  index: number,
  total: number,
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
        <Table.Row key={each.path}>
          <Table.Cell>{each.address}</Table.Cell>
          <Table.Cell>{each.path}</Table.Cell>
          <Table.Cell>{each.count}</Table.Cell>
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

const renderFooter = (
  index: number,
  max: number,
  setIndex: Function,
  balance: number,
  renderPage: boolean,
) => {
  return (
    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell>
          <Label>
            <Icon name="bitcoin" />
            Balance: {balance}
          </Label>
        </Table.HeaderCell>
        <Table.HeaderCell colSpan="3" center>
          {renderPage ? (
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
          ) : null}
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  );
};

export const AddressList = (props: ListProps) => {
  const [index, setIndex] = useState(0);
  const pageCount = 5;

  const shouldShowFooter = () => props.items.length > pageCount;
  const max = Math.floor(props.items.length / pageCount);
  if (props.loading) {
    return renderLoading();
  }
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Address</Table.HeaderCell>
          <Table.HeaderCell>Path</Table.HeaderCell>
          <Table.HeaderCell>Utxo Count</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body></Table.Body>
      {renderBody(props.items, pageCount, index, props.items.length)}
      {renderFooter(index, max, setIndex, props.balance, shouldShowFooter())}
    </Table>
  );
};
