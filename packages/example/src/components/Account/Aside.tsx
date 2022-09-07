import React, { useEffect } from 'react';
import Menu from "../Menu";
import TxList from "./TxList";
import RefreshIcon from "../Icons/RefreshIcon";
import { useKeystoneStore } from "../../mobx";
import { observer } from "mobx-react-lite";
import { useTransaction } from "../../hook/useTransaction";
import { AccountAside, AccountAsideContainer, AccountAsideRefresh } from "./styles"

const Aside = observer(({refreshBalance}: {refreshBalance: () => void}) => {
  const { current, settings: { network} } = useKeystoneStore()
  const { refresh, loading } = useTransaction(network);

  useEffect(() => {
    // TODO: load txs
  }, [network, current?.xpub])

  return (
    <AccountAside>
      <AccountAsideContainer>
        <Menu />
        <TxList network={network} txList={[]} />
        <AccountAsideRefresh>
          <RefreshIcon onClick={refresh} loading={loading}/>
        </AccountAsideRefresh>
      </AccountAsideContainer>
    </AccountAside>
  );
});

export default Aside;
