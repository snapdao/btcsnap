import { types } from 'mobx-state-tree';
import Account from "./account";
import Settings, { settingsInitialState } from "./settings";
import { IAccount, IAccountIn } from "./types";
import Runtime, { runtimeInitialState } from "./runtime";
import { BitcoinNetwork, BitcoinScriptType } from "../interface";
import User, { userInitialState } from './user';

export const storeInitialState = {
  accounts: [],
  current: undefined,
  settings: settingsInitialState,
  runtime: runtimeInitialState,
  user: userInitialState,
  _version: 0,
  _rehydrated: false,
};

const KeystoneStore = types
  .model('KeystoneStore', {
    accounts: types.array(Account),
    current: types.maybe(types.reference(Account)),
    settings: Settings,
    runtime: Runtime,
    user: User,
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
    registeredMfp: (): string => {
      const registeredMfps = Array.from(new Set(self.accounts.map(account => account.mfp)));
      if(registeredMfps.length > 1) {
        throw Error("Multiple MFP exist");
      }
      if(registeredMfps.length === 0){
        return "";
      }
      return registeredMfps[0];
    },
    get persistDataLoaded ():boolean {
      return self._rehydrated;
    },
    connectedScriptTypes(network?: BitcoinNetwork): BitcoinScriptType[] {
      return self.accounts
        .filter(account => account.network === network)
        .map(account => account.scriptType);
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
    disconnectAccount() {
      if(self.current){
        self.current = undefined;
      }
    },
  })))
  .actions((self) => ({
    resetAccounts() {
      self.disconnectAccount();
      self.accounts.clear();
    },
    resetSettings() {
      const { scriptType, network, dynamicAddress } = settingsInitialState;
      self.settings.setScriptType(scriptType);
      self.settings.setNetwork(network);
      self.settings.setDynamicAddress(dynamicAddress);
    },
    resetRuntime() {
      const { status } = runtimeInitialState
      self.runtime.setStatus(status);
    }
  }))
  .actions((self) => ({
    switchToAccount(mfp: string, scriptType: BitcoinScriptType, network: BitcoinNetwork) {
      const targetAccount = self.getAccountBy(mfp, scriptType, network);
      if (targetAccount) {
        self.current = targetAccount;
      } else {
        self.current = undefined;
      }
    },
    resetStore(){
      self.resetAccounts();
      self.resetSettings();
      self.resetRuntime();
    }
  }))

export default KeystoneStore;
