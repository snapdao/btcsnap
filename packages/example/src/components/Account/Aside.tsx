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
import TranscationList from '../TranscationModal';

const Aside = observer(({refreshBalance}: { refreshBalance: () => void }) => {
  const [transactionValue, setTransacionValue] = useState<boolean>(false)
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
          <TransactionLink onClick={() => setTransacionValue(true)}>
            <span>ALL TRANSACTIONS</span>
            <ArrowRight size={18}/>
          </TransactionLink>
          <RefreshIcon onClick={refresh} loading={loading}/>
        </AccountAsideRefresh>
      </AccountAsideContainer>

      {transactionValue && <TranscationList network={network} open={transactionValue} close={() => setTransacionValue(false)} txDefaultList={txList} />}
    </AccountAside>
  );
});

export default Aside;
