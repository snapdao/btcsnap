import {types} from 'mobx-state-tree';
import { TransactionStatus, TransactionType } from "../components/TransactionCard/types";

const Transaction = types
  .model('Transaction', {
    ID: types.string,
    type: types.enumeration(Object.values(TransactionType)),
    status: types.enumeration(Object.values(TransactionStatus)),
    amount: types.string,
    address: types.string,
    date: types.number
  })
  .actions((self) => ({
    updateStatus: (status: TransactionStatus) => {
      self.status = status;
    },
  }));

export default Transaction;
