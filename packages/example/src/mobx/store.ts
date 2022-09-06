import { types } from 'mobx-state-tree';
import Account from "./account";
import Settings, { settingsInitialState } from "./settings";
import { IAccount, IAccountIn  } from "./types";
import Runtime, { runtimeInitialState } from "./runtime";
import Global from "./global";
import { BitcoinNetwork, BitcoinScriptType } from "../interface";

export const storeInitialState = {
  accounts: [],
  current: undefined,
  global: {
    network: BitcoinNetwork.Test,
    scriptType: BitcoinScriptType.P2WPKH,
    bip44Xpub: "",
    connected: true,
  },
  runtime: runtimeInitialState,
  settings: settingsInitialState,
  _version: 0,
};

const KeystoneStore = types
  .model('KeystoneStore', {
    accounts: types.array(Account),
    global: Global,
    current: types.maybe(types.reference(Account)),
    settings: Settings,
    runtime: Runtime,
    _version: types.number,
  })
  .views((self) => ({
    getAccount: (xpub: string) => {
      return self.accounts.find(
        (account) => account.xpub === xpub,
      );
    }
  }))
  .actions((self => ({
    createAccount(accountIn: IAccountIn): IAccount {
      const storedAccount = self.accounts.find((account) => account.xpub === accountIn.xpub);
      if (storedAccount) return storedAccount;
      return Account.create(accountIn);
    },
    applyAccount(account: IAccount) {
      self.accounts.push(account);
      self.current = account;
    },
    switchAccount(xpub: string) {
      const newAccount = self.accounts.find((account) => account.xpub === xpub);
      if (!newAccount) throw new Error(`#store_error: cannot find account#${xpub}`);
      self.current = newAccount;
    },
  })))

export default KeystoneStore;
