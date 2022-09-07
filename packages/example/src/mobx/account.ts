import { types } from 'mobx-state-tree';
import { Coins } from '../constant/supportedCoins';
import Address from './address';
import { BitcoinNetwork, BitcoinScriptType } from "../interface";
import { getKeystoneStore } from "./index";
import { IAddressIn } from "./types";
import { coinManager } from "../services/CoinManager";
import { generateAddressId } from "./utils";
import { EXTENDED_PUBKEY_PATH } from "../constant/bitcoin";
import { registerExtendedPubKey } from "../api";

const Account = types
  .model('Account', {
    id: types.identifier,
    mfp: types.string,
    xpub: types.string,
    path: types.string,
    coinCode: types.enumeration(Coins),
    addresses: types.array(Address),
    scriptType: types.enumeration(Object.values(BitcoinScriptType)),
    network: types.enumeration(Object.values(BitcoinNetwork)),
    balance: types.maybe(types.number),
    hasSyncXPub: false,
  })
  .actions((self) => ({
    syncXPub: async () => {
      try {
        const keystoneStore = getKeystoneStore();
        const mfp = self.mfp;
        const scriptType = self.scriptType;
        const network = keystoneStore.settings.network;

        const coin = network === BitcoinNetwork.Main ? "BTC" : "BTC_TESTNET";
        const path = EXTENDED_PUBKEY_PATH[network][scriptType];
        registerExtendedPubKey(coin, path, self.xpub, scriptType, mfp).then(() => {
          self.hasSyncXPub = true;
        })

      } catch (e) {
        console.error('failed to sync xpub to backend', e);
      }
    },
  }))
  .views((self) => ({
    getAddress: (address: string) => {
      return self.addresses.find((a) => a.address === address);
    },
  }))
  .actions((self) => ({
    afterCreate: () => {
      self.syncXPub();
    },
    updateBalance: (balance: number) => {
      self.balance = balance
    },
    addAddress: (addressIn: IAddressIn) => {
      const storeAddress = self.getAddress(addressIn.address);
      if (storeAddress) return storeAddress;
      const address = Address.create(addressIn);
      self.addresses.push(address);
      self.addresses.sort((a1, a2) => {
        return a1.index - a2.index;
      });
      return address;
    },
    deriveNextAddress: () => {
      const index = self.addresses.length;
      const addressPub = coinManager.xpubToPubkey(self.xpub, 0, index);
      const addressValue = coinManager.deriveAddress(addressPub, self.scriptType, self.network);

      const addressIn = {
        id: generateAddressId(),
        address: addressValue,
        parent: self.id,
        coinCode: self.coinCode,
        change: 0,
        index,
      };
      return Address.create(addressIn);
    },
  }))
  .actions((self) => ({
    deriveAndAddNextAddress: () => {
      const address = self.deriveNextAddress();
      self.addAddress(address);
      return address;
    },
  }))
;

export default Account;
