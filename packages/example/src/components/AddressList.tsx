import { useState } from 'react';
import { Table, Menu, Icon } from 'semantic-ui-react';

type ListProps = {
  items: { index: number; address: string; count: number }[];
  loading: boolean;
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
  return showList.map((each) => (
    <Table.Row key={each.index}>
      <Table.Cell>{each.index}</Table.Cell>
      <Table.Cell>{each.address}</Table.Cell>
      <Table.Cell>{each.count}</Table.Cell>
    </Table.Row>
  ));
};

const renderFooter = (index: number, max: number, setIndex: Function) => {
  return (
    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan="3">
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

export const AddressList = (props: ListProps) => {

  const [index, setIndex] = useState(0);
  const pageCount = 3;

  const shouldShowFooter = () => props.items.length > pageCount;

  const max = Math.floor(props.items.length / pageCount);

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Index</Table.HeaderCell>
          <Table.HeaderCell>Address</Table.HeaderCell>
          <Table.HeaderCell>Utxo Count</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {renderBody(props.items, pageCount, index, props.items.length)}
      </Table.Body>
      {shouldShowFooter() ? renderFooter(index, max, setIndex) : null}
    </Table>
  );
};

export const test = [
  { index: 1, address: 'abc', count: 1 },
  { index: 2, address: 'abc', count: 1 },
  { index: 3, address: 'abc', count: 1 },
  { index: 4, address: 'abc', count: 1 },
];
