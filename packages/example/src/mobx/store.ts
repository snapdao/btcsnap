import { types } from 'mobx-state-tree';
import Global from './global';
import { BitcoinNetwork } from "../interface";

export const storeInitialState = {
  global: {
    network: BitcoinNetwork.Test,
    bip44Xpub: "",
  },
  _version: 0,
};

const KeystoneStore = types
  .model('KeystoneStore', {
    global: Global,
    _version: types.number,
  })

export default KeystoneStore;
