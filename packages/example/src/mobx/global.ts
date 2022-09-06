import {types} from 'mobx-state-tree';
import { BitcoinNetwork, BitcoinScriptType } from "../interface";

const Global = types
  .model('Global', {
    network: types.enumeration(Object.values(BitcoinNetwork)),
    scriptType: types.enumeration(Object.values(BitcoinScriptType)),
    connected: types.boolean,
  })
  .actions((self) => ({
    updateNetwork: (network: BitcoinNetwork) => {
      self.network = network;
    },
    updateConnectionStatus: (connected: boolean) => {
      self.connected = connected;
    }
  }));

export default Global;
