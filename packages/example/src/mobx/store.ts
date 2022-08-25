import { types } from 'mobx-state-tree';
import Global from './global';
import Transaction from "./transaction";
import { TransactionDetail } from "../components/TransactionCard/types";
import { getStoredGlobalData } from "../lib/globalStorage";

const storedGlobalData = getStoredGlobalData();

export const storeInitialState = {
  global: {
    network: storedGlobalData.network,
    bip44Xpub: storedGlobalData.xpub[storedGlobalData.network],
    connected: !!(storedGlobalData.xpub[storedGlobalData.network]),
  },
  transactions: [],
  _version: 0,
};

const KeystoneStore = types
  .model('KeystoneStore', {
    global: Global,
    transactions: types.array(Transaction),
    _version: types.number,
  })
  .actions((self => ({
    updateTransactions: (transactions:TransactionDetail[]) => {
      self.transactions.clear();
      transactions.forEach(tx => {
        self.transactions.push(tx);
      })
    },
    addTransaction: (transaction: TransactionDetail) => {
      self.transactions.unshift(transaction)
    },
  })))

export default KeystoneStore;
