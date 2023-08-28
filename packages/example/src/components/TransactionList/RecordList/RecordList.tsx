import React, { useRef } from 'react';
import { useEffect, useState } from 'react';
import { Modal, Popup } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import InfiniteScroll from 'react-infinite-scroll-component';
import InfoIcon from '../../Icons/InfoIcon';
import CloseIcon from '../../Icons/CloseIcon';
import TransactionIcon from '../../Icons/TransactionIcon';
import LoadingIcon from '../../Icons/Loading';
import {
  ModalHeader,
  ModalHeaderContainer,
  ModalHeaderLabel,
  TransactionListArea,
  MaskArea,
  LoadingIconContainer,
  BottomTipsContainer,
  ListContainer
} from './styles';
import { RecordDetail } from '../RecordDetail';
import { HistoryRecord, TransactionDetail } from '../../../types';
import { useHistoryRecords } from '../../../hook/useHistoryRecords';
import { useAppStore } from '../../../mobx';
import { WalletType } from '../../../interface';
import { RecordCard } from '../RecordCard';
import ErrorIcon from '../../Icons/ErrorIcon';
import { H4 } from '../../../kits';
import { TxErrorInfo, TxErrorRetryButton, TxListEmpty } from '../../Account/styles';

interface RecordListProps {
  open: boolean;
  close: () => void;
  defaultRecords: HistoryRecord[];
}

const TRANSACTION_HISTORY_RECORD_TIPS = 'The previous transactions of addresses before using Zion will not be displayed here.';

export const RecordList = observer(({ open, close, defaultRecords }: RecordListProps) => {
  const [selectedRecord, setSelectedRecord] = useState<HistoryRecord | null>(null);
  const [recordList, setRecordList] = useState<HistoryRecord[]>(defaultRecords);
  const listModalRef = useRef<HTMLDivElement>(null);

  const { currentWalletType } = useAppStore();
  const offset = currentWalletType === WalletType.BitcoinWallet
    ? (defaultRecords.at(-1)?.data as TransactionDetail)?.marker
    : defaultRecords.length;

  const {
    historyRecords,
    loadMore,
    hasMore,
    loading,
    refresh,
    error
  } = useHistoryRecords(10, offset);

  useEffect(() => {
    const allRecords = [...recordList, ...historyRecords];
    const uniqueRecords = allRecords.reduce((acc: HistoryRecord[], cur: HistoryRecord) => {
      if (!acc.map(record => record.id).includes(cur.id)) {
        return [...acc, cur];
      }
      return acc;
    }, []);
    uniqueRecords.sort((tx1, tx2) => tx2.datetime - tx1.datetime);
    setRecordList(uniqueRecords);
  }, [historyRecords]);

  return (
    <Modal open={open} onClose={close} style={{ width: 440, height: 640, borderRadius: 20, position: 'relative' }}>
      <ListContainer>
        <ModalHeader ref={listModalRef}>
          <ModalHeaderContainer>
            <TransactionIcon/>
            <ModalHeaderLabel>transaction details</ModalHeaderLabel>
          </ModalHeaderContainer>
          <CloseIcon onClick={close}/>
        </ModalHeader>

        <TransactionListArea>
          <InfiniteScroll
            dataLength={recordList.length}
            next={loadMore}
            hasMore={hasMore}
            loader={<></>}
            height={543}
            endMessage={
              <BottomTipsContainer>
                <div>
                  <span>No more transactions</span>
                  {
                    currentWalletType === WalletType.BitcoinWallet && (
                      <Popup
                        trigger={<div><InfoIcon/></div>}
                        position='top center'
                        content={TRANSACTION_HISTORY_RECORD_TIPS}
                        inverted
                        style={{ width: 260 }}
                      />
                    )
                  }
                </div>
              </BottomTipsContainer>
            }
          >
            {recordList.map((record: HistoryRecord) => (
              <RecordCard
                key={`${record.id}-${record.title}`}
                record={record}
                onClick={() => setSelectedRecord(record)}
              />
            ))}

            {loading && <LoadingIconContainer><LoadingIcon/></LoadingIconContainer>}
            {error && <TxListEmpty>
              <ErrorIcon />
              <TxErrorInfo>Failed to load</TxErrorInfo>
              <TxErrorRetryButton size='small' onClick={refresh}>
                <H4>RETRY</H4>
              </TxErrorRetryButton>
            </TxListEmpty>}
          </InfiniteScroll>
        </TransactionListArea>

        {selectedRecord && (
          <RecordDetail
            open={!!selectedRecord}
            close={() => setSelectedRecord(null)}
            record={selectedRecord}
            parent={listModalRef.current!}
          />
        )}

        <MaskArea/>
      </ListContainer>
    </Modal>
  );
});
