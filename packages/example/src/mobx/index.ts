import { createContext, useContext } from "react";
import KeystoneStore, {storeInitialState} from './store';
import { createPersistor } from './persist';
import { default as storageAdapter, STORAGE_KEY } from './storage';
import { IStore } from "./types";
export * as utils from './utils';

const store = KeystoneStore.create(storeInitialState);

export const {store: persistedStore, persistor} = createPersistor({
  store,
  storageKey: STORAGE_KEY,
  storageAdapter,
  options: {
    whitelist: ['accounts', 'current', 'settings', 'user', '_version'],
  },
});

const KeystoneStoreContext = createContext<IStore>(store);
export const MobxStoreProvider = KeystoneStoreContext.Provider;

export const useKeystoneStore = () => {
  return useContext(KeystoneStoreContext);
};

export const getKeystoneStore = () => {
  return store;
};