import { types } from 'mobx-state-tree';
import { Coins, SupportedCoins } from '../constant/supportedCoins';
import Address from './address';
import { BitcoinNetwork, BitcoinScriptType } from "../interface";
import { IAddressIn } from "./types";
import { coinManager } from "../services/CoinManager";
import { generateAddressId } from "./utils";
import { EXTENDED_PUBKEY_PATH } from "../constant/bitcoin";
import { registerExtendedPubKey } from "../api";

const validateAddress = (
  addressIn: {index: number; address: string},
  accountIn: {xpub: string; coinCode: SupportedCoins; scriptType: BitcoinScriptType; network: BitcoinNetwork},
): boolean => {
  try {
    const addressPub = coinManager.xpubToPubkey(accountIn.xpub, 0, addressIn.index);
    let derivedAddress = coinManager.deriveAddress(addressPub, accountIn.scriptType, accountIn.network);
    return derivedAddress.toLowerCase() === addressIn.address.toLowerCase();
  } catch (e) {
    return false;
  }
};

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
    receiveAddressIndex: types.number,
    hasSyncXPub: false,
  })
  .actions((self) => ({
    setHasXpubSynced: (synced: boolean) => {
      self.hasSyncXPub = synced;
    },
  }))
  .actions((self) => ({
    syncXPub: async () => {
      try {
        const mfp = self.mfp;
        const scriptType = self.scriptType;
        const network = self.network;

        const coin = network === BitcoinNetwork.Main ? "BTC" : "BTC_TESTNET";
        const path = EXTENDED_PUBKEY_PATH[network][scriptType];
        registerExtendedPubKey(coin, path, self.xpub, scriptType, mfp).then(() => {
          self.setHasXpubSynced(true);
        })
      } catch (e) {
        console.error('Failed to sync xpub', e);
      }
    },
    setReceiveAddressIndex: (receiveAddressIndex: number) => {
      self.receiveAddressIndex = receiveAddressIndex;
    }
  }))
  .views((self) => ({
    getAddress: (address: string) => {
      return self.addresses.find((a) => a.address === address);
    },
    getReceiveAddress: () => {
      return self.addresses.find((addr) => addr.index === self.receiveAddressIndex);
    }
  }))
  .actions((self) => ({
    afterCreate: () => {
      !self.hasSyncXPub && self.syncXPub();
    },
    addAddress: (addressIn: IAddressIn, isDynamic: boolean) => {
      const storeAddress = self.getAddress(addressIn.address);
      if (storeAddress) return storeAddress;
      const address = Address.create(addressIn);
      self.addresses.push(address);
      self.addresses.sort((a1, a2) => {
        return a1.index - a2.index;
      });
      if(isDynamic) {
        self.setReceiveAddressIndex(address.index);
      }
      return address;
    },
    deriveAddress: (index: number) => {
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
    validateAndAddAddress: (addressIn: IAddressIn, isDynamic: boolean) => {
      if (validateAddress(addressIn, self)) {
        return self.addAddress({...addressIn, parent: self.id}, isDynamic);
      }
      console.error(
        `#store_account_error: verify failed, coin ${self.coinCode}, address ${addressIn.address}, path: ${addressIn.change}/${addressIn.index}`,
      );
    }
  }))
;

export default Account;
