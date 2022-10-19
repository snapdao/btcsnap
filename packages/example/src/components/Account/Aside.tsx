import React, { useState, useCallback } from 'react';
import Menu from "../Menu";
import TxList from "./TxList";
import RefreshIcon from "../Icons/RefreshIcon";
import { useAppStore } from "../../mobx";
import { observer } from "mobx-react-lite";
import { useTransaction } from "../../hook/useTransaction";
import { AccountAside, AccountAsideContainer, AsideHeading, AccountAsideRefresh, TestnetMark, TransactionLink } from "./styles"
import { BitcoinNetwork } from "../../interface";
import NetworkIcon from "../Icons/Network";
import ArrowRight from '../Icons/ArrowRight';
import TransactionList from '../TransactionList';
import { AppStatus } from '../../mobx/runtime';

const Aside = observer(({refreshBalance}: { refreshBalance: () => void }) => {
  const [isTransactionValue, setIsTransactionValue] = useState<boolean>(false);
  const {settings: {network}, current, runtime: {continueConnect}} = useAppStore();
  const {txList, refresh: refreshTransactions, loading} = useTransaction({size: 5});

  const refresh = useCallback(() => {
    refreshBalance();
    refreshTransactions();
  }, [refreshBalance, refreshTransactions])

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
          <RefreshIcon onClick={refresh} loading={loading}/>
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
