import { SupportedCoins } from '../../../constant/supportedCoins';
import { BitcoinNetwork, BitcoinScriptType } from '../../../interface';

type accountId = string;
type addressId = string;

export type StoreVersion_0 = {
  accounts:{
    id: accountId;
    mfp: string;
    xpub: string;
    path: string;
    coinCode: SupportedCoins;
    scriptType: BitcoinScriptType,
    network: BitcoinNetwork,
    receiveAddressIndex: number,
    addresses: {
      id: addressId;
      address: string;
      name: string;
      parent: accountId;
      coinCode: SupportedCoins;
      change: number;
      index: number;
    }[];
    hasSyncXPub: boolean;
  }[]
  current: accountId;
  settings: {
    network: BitcoinNetwork;
    scriptType: BitcoinScriptType;
    dynamicAddress: boolean;
  };
  _version: number;
};
