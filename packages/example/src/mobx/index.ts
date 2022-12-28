import { createContext, useContext } from 'react';
import AppStore, { storeInitialState } from './store';
import { createPersistor } from './persist';
import { default as storageAdapter, STORAGE_KEY } from './storage';
import { IStore } from './types';
export * as utils from './utils';

const store = AppStore.create(storeInitialState);

export const { store: persistedStore, persistor } = createPersistor({
  store,
  storageKey: STORAGE_KEY,
  storageAdapter,
  options: {
    whitelist: [
      'accounts',
      'current',
      'settings',
      'user',
      'lightning',
      'currentWalletType',
      '_version',
    ],
  },
});

const AppStoreContext = createContext<IStore>(store);
export const MobxStoreProvider = AppStoreContext.Provider;

export const useAppStore = () => {
  return useContext(AppStoreContext);
};

export const getAppStore = () => {
  return store;
};
