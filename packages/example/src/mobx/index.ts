import { createContext, useContext } from "react";
import KeystoneStore, {storeInitialState} from './store';

const store = KeystoneStore.create(storeInitialState);

//@ts-ignore
window.store = store;

const KeystoneStoreContext = createContext(store);
export const MobxStoreProvider = KeystoneStoreContext.Provider;

export const useKeystoneStore = () => {
  const store = useContext(KeystoneStoreContext);
  return store
};

export const getKeystoneStore = () => {
  return store;
};