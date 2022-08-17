import { TransactionDetail } from "../components/TransactionCard/types";
import { BitcoinNetwork } from "../interface";

const TRANSACTIONS_PREFIX = "txList"

const txListStorageKey = (xpub: string) => `${TRANSACTIONS_PREFIX}-${xpub}`

type TxStorage= Record<BitcoinNetwork, TransactionDetail[]>

const getAllTransactions = (xpub: string): TxStorage => {
  const txListStr = localStorage.getItem(txListStorageKey(xpub));
  if(txListStr) {
    return JSON.parse(txListStr)
  }
  return {
    [BitcoinNetwork.Main]: [],
    [BitcoinNetwork.Test]: [],
  };
}

export const storeTransaction = (xpub: string, network: BitcoinNetwork, transaction: TransactionDetail) => {
  const localTxs = getAllTransactions(xpub);
  const newLocalTxs = {
    ...localTxs,
    [network]: [
      transaction,
      ...localTxs[network],
    ]
  };
  localStorage.setItem(txListStorageKey(xpub), JSON.stringify(newLocalTxs));
}

export const getStoredTransactions = (xpub: string, network: BitcoinNetwork): TransactionDetail[] => {
  const txListStr = localStorage.getItem(txListStorageKey(xpub));
  if(txListStr) {
    return JSON.parse(txListStr)[network]
  }
  return [];
}
