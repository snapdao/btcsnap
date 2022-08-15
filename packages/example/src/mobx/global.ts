import {types} from 'mobx-state-tree';
import { BitcoinNetwork } from "../interface";

const Global = types
  .model('Global', {
    network: types.enumeration(Object.values(BitcoinNetwork)),
    bip44Xpub: types.string,
  })
  .actions((self) => ({
    updateNetwork: (network: BitcoinNetwork) => {
      self.network = network;
    },
    updateBip44Xpub: (xpub: string) => {
      self.bip44Xpub = xpub;
    }
  }));

export default Global;
