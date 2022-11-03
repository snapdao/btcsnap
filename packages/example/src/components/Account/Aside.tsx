import React, { useState, useCallback, useEffect } from 'react';
import Menu from "../Menu";
import TxList from "./TxList";
import RefreshIcon from "../Icons/RefreshIcon";
import { useAppStore } from "../../mobx";
import { observer } from "mobx-react-lite";
import { useTransaction } from "../../hook/useTransaction";
import { BitcoinNetwork } from "../../interface";
import NetworkIcon from "../Icons/Network";
import ArrowRight from '../Icons/ArrowRight';
import TransactionList from '../TransactionList';
import {
  AccountAside,
  AccountAsideContainer,
  AsideHeading,
  AccountAsideRefresh,
  TestnetMark,
  TransactionLink
} from "./styles";
import { AppStatus } from '../../mobx/runtime';

interface AsideProps {
  loadingBalance: boolean;
  refreshBalance: () => void;
}

const Aside = observer(({refreshBalance, loadingBalance}: AsideProps) => {
  const [isTransactionValue, setIsTransactionValue] = useState<boolean>(false);
  const {settings: {network}, current, runtime: {continueConnect, status}} = useAppStore();
  const {txList, refresh: refreshTransactions, loading} = useTransaction({size: 5});
  const isRefreshing = loading || loadingBalance;

  const refresh = useCallback(() => {
    if(isRefreshing){
      return;
    }
    refreshBalance();
    refreshTransactions();
  }, [refreshBalance, refreshTransactions, isRefreshing])

  useEffect(() => {
    if(status === AppStatus.RefreshApp) {
      refresh();
    }
  }, [status])

  const openTransaction = () => {
    if(!current) {
      continueConnect();
      return;
    }
    setIsTransactionValue(true);
  }

  return (
    <AccountAside>
      <AccountAsideContainer>
        <AsideHeading>
          { network === BitcoinNetwork.Test && (
            <TestnetMark>
              <NetworkIcon network={network}/> Testnet
            </TestnetMark>
          )}
          <Menu/>
        </AsideHeading>

        <TxList network={network} txList={txList}/>

        <AccountAsideRefresh>
          <TransactionLink onClick={openTransaction}>
            all transactions
            <span><ArrowRight size={18}/></span>
          </TransactionLink>
          <RefreshIcon onClick={refresh} loading={isRefreshing}/>
        </AccountAsideRefresh>
      </AccountAsideContainer>

      {isTransactionValue &&
        <TransactionList
          network={network}
          open={isTransactionValue}
          close={() => setIsTransactionValue(false)}
          txDefaultList={txList}
        />}
    </AccountAside>
  );
});

export default Aside;
