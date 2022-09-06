import {types} from 'mobx-state-tree';
import { BitcoinNetwork, BitcoinScriptType } from "../interface";

export const settingsInitialState = {
  network: BitcoinNetwork.Test,
  scriptType: BitcoinScriptType.P2WPKH,
  currency: 'USD',
  currencySymbol: '$',
  dynamicAddress: false,
};

const Settings = types
  .model('Settings', {
    network: types.enumeration(Object.values(BitcoinNetwork)),
    scriptType: types.enumeration(Object.values(BitcoinScriptType)),
    dynamicAddress: types.boolean,
    currency: types.string,
    currencySymbol: types.string,
  })
  .actions((self) => ({
    setDynamicAddress:(isDynamic: boolean) => {
      self.dynamicAddress = isDynamic
    },
    setNetwork: (network: BitcoinNetwork) => {
      self.network = network;
    },
    setScriptType: (scriptType: BitcoinScriptType) => {
      self.scriptType = scriptType;
    }
  }))

export default Settings;
