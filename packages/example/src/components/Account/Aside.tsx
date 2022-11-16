import React, { useState, useCallback, useEffect } from 'react';
import Menu from '../Menu';
import TxList from './TxList';
import RefreshIcon from '../Icons/RefreshIcon';
import { useAppStore } from '../../mobx';
import { LNWalletStepStatus } from '../../mobx/user';
import { observer } from 'mobx-react-lite';
import { useTransaction } from '../../hook/useTransaction';
import { ReactComponent as Bitcoin } from './image/bitcoin.svg';
import { ReactComponent as Lightning } from './image/lightning.svg';
import ArrowRight from '../Icons/ArrowRight';
import TransactionList from '../TransactionList';
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
import Joyride, { ACTIONS, Placement } from 'react-joyride';
import { UserGuide } from '../Lightning';
import { WalletList } from '../WalletList';
import { WalletType } from '../../interface';

interface AsideProps {
  loadingBalance: boolean;
  refreshBalance: () => void;
}

const Aside = observer(({ refreshBalance, loadingBalance }: AsideProps) => {
  const [isTransactionValue, setIsTransactionValue] = useState<boolean>(false);
  const [shouldShowWalletList, setShouldShowWalletList] =
    useState<boolean>(false);
  const {
    current,
    settings: { network },
    runtime: { continueConnect, status },
    user: { LNWalletStep, setLNWalletStep },
    lightning,
    currentWalletType,
  } = useAppStore();
  const {
    txList,
    refresh: refreshTransactions,
    loading,
  } = useTransaction({ size: 5 });
  const isRefreshing = loading || loadingBalance;
  const currentWalletName =
    currentWalletType === WalletType.BitcoinWallet
      ? 'BTC Wallet'
      : lightning.current?.name;

  const steps = [
    {
      target: '#first-step',
      content: 'You can create a lightning wallet here at any point of time.',
      disableBeacon: true,
      placement: 'bottom-end' as Placement,
    },
  ];

  const refresh = useCallback(() => {
    if (isRefreshing) {
      return;
    }
    refreshBalance();
    refreshTransactions();
  }, [refreshBalance, refreshTransactions, isRefreshing]);

  useEffect(() => {
    if (status === AppStatus.RefreshApp) {
      refresh();
    }
  }, [status]);

  const confirmUserGuide = (data: any) => {
    if (data.action === ACTIONS.RESET) {
      setLNWalletStep(LNWalletStepStatus.Done);
    }
  };

  const openTransaction = () => {
    if (!current) {
      continueConnect();
      return;
    }
    setIsTransactionValue(true);
  };

  return (
    <AccountAside>
      <AccountAsideContainer>
        <AsideHeading>
          <Joyride
            callback={confirmUserGuide}
            run={LNWalletStep === LNWalletStepStatus.UserGuide}
            steps={steps}
            hideCloseButton={true}
            styles={{
              spotlight: {
                borderRadius: 22,
              },
            }}
            tooltipComponent={UserGuide}
          />
          {!!current && (
            <AsideBitcoinContainer
              id="first-step"
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

        <TxList network={network} txList={txList} />

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

      {isTransactionValue && (
        <TransactionList
          network={network}
          open={isTransactionValue}
          close={() => setIsTransactionValue(false)}
          txDefaultList={txList}
        />
      )}
    </AccountAside>
  );
});

export default Aside;
