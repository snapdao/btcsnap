import {types} from 'mobx-state-tree';
import { BitcoinNetwork, BitcoinScriptType } from '../interface';

export const settingsInitialState = {
  network: BitcoinNetwork.Main,
  scriptType: BitcoinScriptType.P2WPKH,
  dynamicAddress: false,
};

const Settings = types
  .model('Settings', {
    network: types.enumeration(Object.values(BitcoinNetwork)),
    scriptType: types.enumeration(Object.values(BitcoinScriptType)),
    dynamicAddress: types.boolean,
  })
  .actions((self) => ({
    setNetwork: (network: BitcoinNetwork) => {
      self.network = network;
    },
    setScriptType: (scriptType: BitcoinScriptType) => {
      self.scriptType = scriptType;
    },
    setDynamicAddress:(isDynamic: boolean) => {
      self.dynamicAddress = isDynamic;
    },
  }));

export default Settings;
