import { TransactionDetail } from "../components/TransactionCard/types";

const TRANSACTIONS_PREFIX = "txList"

const txListStorageKey = (xpub: string) => `${TRANSACTIONS_PREFIX}-${xpub}`

export const getStoredTransactions = (xpub: string): TransactionDetail[] => {
  const txListStr = localStorage.getItem(txListStorageKey(xpub));
  if (txListStr) {
    return JSON.parse(txListStr)
  }
  return []
}

export const storeTransaction = (xpub: string, transaction: TransactionDetail) => {
  const localTxs = getStoredTransactions(xpub);
  const newLocalTxs = [
    transaction,
    ...localTxs.filter(tx => tx.ID !== transaction.ID),
  ];
  localStorage.setItem(txListStorageKey(xpub), JSON.stringify(newLocalTxs));
}

export const updateStoredTransactions = (xpub: string, transactions: TransactionDetail[]) => {
  localStorage.setItem(txListStorageKey(xpub), JSON.stringify(transactions));
}
