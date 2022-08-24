import { types } from 'mobx-state-tree';
import Global from './global';
import { BitcoinNetwork } from "../interface";
import Transaction from "./transaction";
import { TransactionDetail } from "../components/TransactionCard/types";

export const storeInitialState = {
  global: {
    network: BitcoinNetwork.Main,
    bip44Xpub: "",
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
