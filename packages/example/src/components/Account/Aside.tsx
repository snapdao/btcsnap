import React, { useState, useCallback } from 'react';
import Menu from "../Menu";
import TxList from "./TxList";
import RefreshIcon from "../Icons/RefreshIcon";
import { useKeystoneStore } from "../../mobx";
import { observer } from "mobx-react-lite";
import { useTransaction } from "../../hook/useTransaction";
import { AccountAside, AccountAsideContainer, AsideHeading, AccountAsideRefresh, TestnetMark, TransactionLink } from "./styles"
import { BitcoinNetwork } from "../../interface";
import NetworkIcon from "../Icons/Network";
import ArrowRight from '../Icons/ArrowRight';
import TransactionList from '../TransactionList';

const Aside = observer(({refreshBalance}: { refreshBalance: () => void }) => {
  const [isTransactionValue, setIsTransactionValue] = useState<boolean>(false)
  const {settings: {network}} = useKeystoneStore();
  const {txList, refresh: refreshTransactions, loading} = useTransaction({size: 5});

  const refresh = useCallback(() => {
    refreshBalance();
    refreshTransactions();
  }, [refreshBalance, refreshTransactions])

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
          <TransactionLink onClick={() => setIsTransactionValue(true)}>
            <span>all transactions</span>
            <ArrowRight size={18}/>
          </TransactionLink>
          <RefreshIcon onClick={refresh} loading={loading}/>
        </AccountAsideRefresh>
      </AccountAsideContainer>

      {isTransactionValue && <TransactionList network={network} open={isTransactionValue} close={() => setIsTransactionValue(false)} txDefaultList={txList} />}
    </AccountAside>
  );
});

export default Aside;
