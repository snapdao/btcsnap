import React, { useCallback } from 'react';
import Menu from "../Menu";
import TxList from "./TxList";
import RefreshIcon from "../Icons/RefreshIcon";
import { useKeystoneStore } from "../../mobx";
import { observer } from "mobx-react-lite";
import { useTransaction } from "../../hook/useTransaction";
import { AccountAside, AccountAsideContainer, AsideHeading, AccountAsideRefresh, TestnetMark } from "./styles"
import { BitcoinNetwork } from "../../interface";
import NetworkIcon from "../Icons/Network";

const Aside = observer(({refreshBalance}: { refreshBalance: () => void }) => {
  const {settings: {network}} = useKeystoneStore();
  const {txList, refresh: refreshTransactions, loading} = useTransaction();

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
          <RefreshIcon onClick={refresh} loading={loading}/>
        </AccountAsideRefresh>
      </AccountAsideContainer>
    </AccountAside>
  );
});

export default Aside;
