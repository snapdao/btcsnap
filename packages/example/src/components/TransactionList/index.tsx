import { useEffect, useState } from "react";
import { Modal } from "semantic-ui-react";
import { TransactionType } from "snapkit";
import { observer } from "mobx-react-lite";
import { useTransaction } from "../../hook/useTransaction";
import InfiniteScroll from 'react-infinite-scroll-component';
import { TransactionTypes, TransactionDetail, TransactionStatus } from "./types";
import { BitcoinNetwork } from "../../interface";
import CloseIcon from "../Icons/CloseIcon";
import TransactionIcon from "../Icons/TransactionIcon";
import LoadingIcon from "../Icons/Loading";
import TransactionDetails from "./TransactionDetails";
import {
  ModalHeader,
  ModalHeaderContainer,
  ModalHeaderLabel,
  TransactionItem,
  TransactionListArea,
  MaskArea,
  LoadingIconContainer,
  BottomTipsContainer
} from "./styles";


interface SettingProps {
  network: BitcoinNetwork
  open: boolean;
  close: () => void;
  txDefaultList: TransactionDetail[];
}

const TransactionList = observer(({network, open, close, txDefaultList} : SettingProps) => {
  const [selectedTransactionItem, setSelectedTransactionItem] = useState<TransactionDetail | null>(null);
  const [transactionList, setTransactionList] = useState<TransactionDetail[]>(txDefaultList);
  const {txList, loadMore, hasMore} = useTransaction({size: 10, offset: txDefaultList[txDefaultList.length - 1]?.marker});

  const openTransactionItem = (item:TransactionDetail) => {
    setSelectedTransactionItem(item);
  }

  useEffect(() => {
    setTransactionList([...transactionList, ...txList]);
  },[txList])

  return (
    <Modal open={open} onClose={close} style={{width: 440, height: 640, borderRadius: 20, position: 'relative'}}>
      <ModalHeader>
        <ModalHeaderContainer>
          <TransactionIcon />
          <ModalHeaderLabel>transaction details</ModalHeaderLabel>
        </ModalHeaderContainer>
        <CloseIcon onClick={close} />
      </ModalHeader>

      <TransactionListArea>
        <InfiniteScroll
          dataLength={transactionList.length}
          next={loadMore}
          hasMore={hasMore}
          loader={<LoadingIconContainer><LoadingIcon /></LoadingIconContainer>}
          height={543}
          endMessage={
            <BottomTipsContainer>
              <span>No more transactions</span>
            </BottomTipsContainer>
          }
        >
          {transactionList.map((i: any) => (
            <TransactionItem
              key={i.ID}
              type={i.type === TransactionTypes.Send ? TransactionType.SEND : TransactionType.RECEIVED}
              amount={i.amount}
              address={i.address}
              datetime={new Date(i.date)}
              loading={i.status === TransactionStatus.Pending}
              onClick={() => openTransactionItem(i)}
            />
          ))}
        </InfiniteScroll>
      </TransactionListArea>

      {!!selectedTransactionItem &&
        <TransactionDetails
          network={network}
          open={!!selectedTransactionItem}
          close={() => setSelectedTransactionItem(null)}
          details={selectedTransactionItem}
        />
      }

      <MaskArea />
    </Modal>
  )
})

export default TransactionList
