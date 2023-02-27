import React, { useState, useCallback, useEffect } from 'react';
import Menu from '../Menu';
import RefreshIcon from '../Icons/RefreshIcon';
import { useAppStore } from '../../mobx';
import { observer } from 'mobx-react-lite';
import { ReactComponent as Bitcoin } from './image/bitcoin.svg';
import { ReactComponent as Lightning } from './image/lightning.svg';
import ArrowRight from '../Icons/ArrowRight';
import {
  AccountAside,
  AccountAsideContainer,
  AsideHeading,
  AccountAsideRefresh,
  TransactionLink,
  AsideBitcoinContainer,
  WalletNameContainer,
} from './styles';
import { AppStatus } from '../../mobx/runtime';
import { WalletList } from '../WalletList';
import { WalletType } from '../../interface';
import { useHistoryRecords } from '../../hook/useHistoryRecords';
import { LatestRecords } from './LatestRecords';
import { RecordList } from '../TransactionList';
import { trackTransactionButton } from '../../tracking';

interface AsideProps {
  loadingBalance: boolean;
  refreshBalance: () => void;
}

const Aside = observer(({ refreshBalance, loadingBalance }: AsideProps) => {
  const {
    current,
    runtime: { continueConnect, status },
    user: { bitcoinWalletName },
    lightning,
    currentWalletType,
  } = useAppStore();
  const [shouldShowRecordDetail, setShouldShowRecordDetail] = useState<boolean>(false);
  const [shouldShowWalletList, setShouldShowWalletList] = useState<boolean>(false);
  const { historyRecords, loading, refresh: refreshRecords, error } = useHistoryRecords(5);

  const isRefreshing = loading || loadingBalance;
  const currentWalletName =
    currentWalletType === WalletType.BitcoinWallet
      ? bitcoinWalletName
      : lightning.current?.name;

  const refresh = useCallback(() => {
    if (isRefreshing) {
      return;
    }
    refreshBalance();
    refreshRecords();
    trackTransactionButton('refresh');
  }, [refreshBalance, refreshRecords, isRefreshing]);

  useEffect(() => {
    if (status === AppStatus.RefreshApp) {
      refresh();
    }
  }, [status]);

  const openTransaction = () => {
    if (!current) {
      continueConnect();
      return;
    }
    trackTransactionButton('all');
    setShouldShowRecordDetail(true);
  };

  return (
    <AccountAside>
      <AccountAsideContainer>
        <AsideHeading>
          {!!current && (
            <AsideBitcoinContainer
              id='first-step'
              onClick={() => {
                setShouldShowWalletList(true);
              }}>
              <WalletNameContainer>{currentWalletName}</WalletNameContainer>
              {currentWalletType === WalletType.BitcoinWallet ? (
                <Bitcoin />
              ) : (
                <Lightning />
              )}
            </AsideBitcoinContainer>
          )}
          <Menu />
        </AsideHeading>

        <LatestRecords loading={loading} historyList={historyRecords} refresh={refreshRecords} error={error} />

        <AccountAsideRefresh>
          <TransactionLink onClick={openTransaction}>
            all transactions
            <span>
              <ArrowRight size={18} />
            </span>
          </TransactionLink>
          <RefreshIcon onClick={refresh} loading={isRefreshing} />
        </AccountAsideRefresh>

        <WalletList
          open={shouldShowWalletList}
          close={() => {
            setShouldShowWalletList(false);
          }}
        />
      </AccountAsideContainer>

      {shouldShowRecordDetail && (
        <RecordList
          open={shouldShowRecordDetail}
          close={() => setShouldShowRecordDetail(false)}
          defaultRecords={historyRecords}
        />
      )}
    </AccountAside>
  );
});

export default Aside;
