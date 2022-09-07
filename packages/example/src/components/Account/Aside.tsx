import React, { useEffect, useRef } from 'react';
import Menu from "../Menu";
import TxList from "./TxList";
import RefreshIcon from "../Icons/RefreshIcon";
import { useKeystoneStore } from "../../mobx";
import { getStoredTransactions, updateStoredTransactions } from "../../lib/txStorage";
import { observer } from "mobx-react-lite";
import { useTransaction } from "../../hook/useTransaction";
import { TransactionStatus } from "../TransactionCard/types";
import { AccountAside, AccountAsideContainer, AccountAsideRefresh } from "./styles"

const Aside = observer(({refreshBalance}: {refreshBalance: () => void}) => {
  const { global: { network, bip44Xpub }, transactions, updateTransactions } = useKeystoneStore()
  const { addTxs, txList, refresh, loading } = useTransaction(network);
  const transactionAmount = useRef(0);

  useEffect(() => {
    // Load local stored transactions
    const storedTxs = getStoredTransactions(bip44Xpub);
    transactionAmount.current = storedTxs.length;
    const pendingTxs = storedTxs.filter(tx => tx.status === TransactionStatus.PENDING).map(tx => tx.ID)
    pendingTxs.length && addTxs(pendingTxs);
    updateTransactions(storedTxs);
  }, [network, bip44Xpub])

  useEffect(() => {
    const confirmedTxs = txList.filter(tx => tx.status === TransactionStatus.CONFIRMED);
    if (confirmedTxs.length > 0) {
      const updatedTxs = transactions.map(transaction => ({
        ...transaction,
        status: confirmedTxs.find(tx => tx.txId === transaction.ID)?.status || transaction.status
      }))
      updateTransactions(updatedTxs);
      updateStoredTransactions(bip44Xpub, updatedTxs);
    }
  }, [txList])

  useEffect(() => {
    if(transactions.length === transactionAmount.current){
      return;
    }
    // New Transaction Sent
    transactionAmount.current = transactions.length;
    const pendingIds = transactions.filter(tx => tx.status === TransactionStatus.PENDING).map(tx => tx.ID)
    if(pendingIds.length > 0) {
      addTxs(pendingIds);
      refreshBalance();
    }
  }, [transactions.length, transactionAmount.current])

  return (
    <AccountAside>
      <AccountAsideContainer>
        <Menu />
        <TxList network={network} txList={transactions} />
        <AccountAsideRefresh>
          <RefreshIcon onClick={refresh} loading={loading}/>
        </AccountAsideRefresh>
      </AccountAsideContainer>
    </AccountAside>
  );
});

export default Aside;
