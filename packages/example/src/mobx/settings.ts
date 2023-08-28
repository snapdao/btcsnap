import { types } from 'mobx-state-tree';
import { BitcoinNetwork, BitcoinScriptType } from '../interface';

export const settingsInitialState = {
  network: BitcoinNetwork.Main,
  scriptType: BitcoinScriptType.P2WPKH,
  dynamicAddress: false,
  changeAddress: false,
};

const Settings = types
  .model('Settings', {
    network: types.enumeration(Object.values(BitcoinNetwork)),
    scriptType: types.enumeration(Object.values(BitcoinScriptType)),
    dynamicAddress: types.boolean,
    changeAddress: types.optional(types.boolean, false),
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
      if (isDynamic) {
        self.changeAddress = true;
      }
    },
    setChangeAddress:(useChangeAddress: boolean) => {
      self.changeAddress = useChangeAddress;
    },
  }));

export default Settings;
