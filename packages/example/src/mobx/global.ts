import {types} from 'mobx-state-tree';
import { BitcoinNetwork } from "../interface";

const Global = types
  .model('Global', {
    network: types.enumeration(Object.values(BitcoinNetwork)),
    bip44Xpub: types.string,
    connected: types.boolean,
  })
  .actions((self) => ({
    updateNetwork: (network: BitcoinNetwork) => {
      self.network = network;
    },
    updateBip44Xpub: (xpub: string) => {
      self.bip44Xpub = xpub;
    },
    updateConnectionStatus: (connected: boolean) => {
      self.connected = connected;
    }
  }));

export default Global;
