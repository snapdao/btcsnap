import { types } from 'mobx-state-tree';

const Wallet = types.model('RuntimeWallet', {
  id: types.string,
  balance: types.number,
  balanceFetched: types.boolean,
})
  .actions((self) => ({
    setBalance: (balance: number) => {
      self.balance = balance;
    },
    fetchBalance: () => {
      self.balanceFetched = false;
    }
  }));

export default Wallet;
