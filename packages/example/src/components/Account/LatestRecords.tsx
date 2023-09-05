import React, { useEffect, useState } from 'react';
import { ReactComponent as TransactionsIcon } from './image/transactions.svg';
import { observer } from 'mobx-react-lite';
import { TxListContainer, TxListContent, TxListEmpty, EmptyTip, TxErrorInfo, TxErrorRetryButton } from './styles';
import { useAppStore } from '../../mobx';
import InfoIcon from '../Icons/InfoIcon';
import { HistoryRecord } from '../../types';
import { RecordDetail } from '../TransactionList/RecordDetail';
import { H4, Popup } from '../../kits';
import { WalletType } from '../../interface';
import { RecordCard } from '../TransactionList/RecordCard';
import ErrorIcon from '../Icons/ErrorIcon';
import { StyledRecordCardSkeleton } from '../TransactionList/RecordCard/styles';

interface TxCardProps {
  loading: boolean
  historyList: HistoryRecord[];
  error?: string,
  refresh: () => void
}

const TRANSACTION_TIPS = 'The previous transactions of addresses before using Zion will not be displayed here.';

export const LatestRecords = observer(({ loading, historyList, refresh, error }: TxCardProps) => {
  const { current, currentWalletType } = useAppStore();
  const [selectedRecord, setSelectedRecord] = useState<HistoryRecord | null>(null);

  let recordList = [...historyList];
  recordList.sort((tx1, tx2) => tx2.datetime - tx1.datetime);

  useEffect(() => {
    if (currentWalletType === WalletType.BitcoinWallet && !current) {
      recordList = [];
    }
  }, [current, currentWalletType]);

  const emptyRecordList = (
    <TxListEmpty>
      <TransactionsIcon/>
      <EmptyTip>
        <span>no transactions</span>
        {
          currentWalletType === WalletType.BitcoinWallet && (
            <Popup
              trigger={<div><InfoIcon/></div>}
              content={TRANSACTION_TIPS}
              style={{ width: '296px' }}
            />
          )
        }
      </EmptyTip>
    </TxListEmpty>
  );

  if(!current) {
    return <TxListContainer>{emptyRecordList}</TxListContainer>;
  }

  return (
    <TxListContainer>
      {
        loading ?
          <TxListContent>
            {Array.from({ length: 5 })
              .map((_, index) => <StyledRecordCardSkeleton key={index} />)}
          </TxListContent>
          : error ?
            <TxListEmpty>
              <ErrorIcon />
              <TxErrorInfo>Failed to load</TxErrorInfo>
              <TxErrorRetryButton size='small' onClick={refresh}>
                <H4>RETRY</H4>
              </TxErrorRetryButton>
            </TxListEmpty>
            : recordList.length > 0 ? (
              <TxListContent>
                {recordList.map(record =>
                  <RecordCard
                    key={`${record.id}-${record.title}`}
                    record={record}
                    onClick={() => setSelectedRecord(record)}
                  />
                )}
              </TxListContent>
            ) : emptyRecordList
      }
      {!!selectedRecord && (
        <RecordDetail
          open={!!selectedRecord}
          close={() => setSelectedRecord(null)}
          record={selectedRecord}
          parent={document.body}
        />
      )}
    </TxListContainer>
  );
});
