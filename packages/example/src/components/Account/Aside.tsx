import React, { useEffect } from 'react';
import Menu from "../Menu";
import TxList from "./TxList";
import RefreshIcon from "../Icons/RefreshIcon";
import { useKeystoneStore } from "../../mobx";
import { getStoredTransactions } from "../../lib/txStorage";
import { observer } from "mobx-react-lite";

const Aside = observer(() => {
  const { global: { network, bip44Xpub }, transactions, updateTransactions } = useKeystoneStore()
  // const { txList } = useTransaction(network);

  useEffect(() => {
    // load local stored transactions
    const storedTxs = getStoredTransactions(bip44Xpub, network);
    updateTransactions(storedTxs);
  }, [network, bip44Xpub])

  return (
    <div className="Account-Aside">
      <div className="Account-Aside-Container">
        <Menu />
        <TxList txList={transactions} />
        <RefreshIcon />
      </div>
    </div>
  );
});

export default Aside;
