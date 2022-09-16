import { createContext, useContext } from "react";
import KeystoneStore, {storeInitialState} from './store';
import { IStore } from "./types";
export * as utils from './utils';

const store = KeystoneStore.create(storeInitialState);

//@ts-ignore
window.store = store;

const KeystoneStoreContext = createContext<IStore>(store);
export const MobxStoreProvider = KeystoneStoreContext.Provider;

export const useKeystoneStore = () => {
  return useContext(KeystoneStoreContext);
};

export const getKeystoneStore = () => {
  return store;
};