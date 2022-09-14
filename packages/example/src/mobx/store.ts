import { types } from 'mobx-state-tree';
import Account from "./account";
import Settings, { settingsInitialState } from "./settings";
import { IAccount, IAccountIn } from "./types";
import Runtime, { runtimeInitialState } from "./runtime";
import { BitcoinNetwork, BitcoinScriptType } from "../interface";

export const storeInitialState = {
  accounts: [],
  current: undefined,
  settings: settingsInitialState,
  runtime: runtimeInitialState,

  _version: 0,
  _rehydrated: false,
};

const KeystoneStore = types
  .model('KeystoneStore', {
    accounts: types.array(Account),
    current: types.maybe(types.reference(Account)),
    settings: Settings,
    runtime: Runtime,
    _version: types.number,
    _rehydrated: types.boolean,
  })
  .views((self) => ({
    getAccount: (xpub: string) => {
      return self.accounts.find(
        (account) => account.xpub === xpub,
      );
    },
    getAccountBy: (mfp: string, scriptType: BitcoinScriptType, network: BitcoinNetwork) => {
      return self.accounts.find(
        (account) => account.mfp === mfp && account.scriptType === scriptType && account.network === network,
      );
    },
    registeredMfps: () => {
      return Array.from(new Set(self.accounts.map(account => account.mfp)));
    },
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
    removeAllAccounts() {
      if(self.current){
        self.accounts.clear();
        self.current = undefined;
      }
    }
  })))
  .actions((self) => ({
    switchToAccount(mfp: string, scriptType: BitcoinScriptType, network: BitcoinNetwork) {
      const targetAccount = self.getAccountBy(mfp, scriptType, network);
      if (targetAccount) {
        self.current = targetAccount;
      } else {
        self.current = undefined;
      }
    },
  }))

export default KeystoneStore;
