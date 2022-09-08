import React, { useCallback, useEffect, useState } from 'react';
import Menu from "../Menu";
import TxList from "./TxList";
import RefreshIcon from "../Icons/RefreshIcon";
import { useKeystoneStore } from "../../mobx";
import { observer } from "mobx-react-lite";
import { useTransaction } from "../../hook/useTransaction";
import { AccountAside, AccountAsideContainer, AccountAsideRefresh } from "./styles"

const Aside = observer(({refreshBalance}: { refreshBalance: () => void }) => {
  const {settings: {network}} = useKeystoneStore()
  const {txList, refresh: refreshTransactions, loading} = useTransaction();

  const refresh = useCallback(() => {
    refreshBalance();
    refreshTransactions();
  }, [refreshBalance, refreshTransactions])

  return (
    <AccountAside>
      <AccountAsideContainer>
        <Menu/>
        <TxList network={network} txList={txList}/>
        <AccountAsideRefresh>
          <RefreshIcon onClick={refresh} loading={loading}/>
        </AccountAsideRefresh>
      </AccountAsideContainer>
    </AccountAside>
  );
});

export default Aside;
