import {types} from 'mobx-state-tree';
import LightningWallet from "./lightningWallet";

export const lightningInitialState = {
  wallets: [],
  current: undefined,
}

const Lightning = types
  .model('Lightning', {
    wallets: types.array(LightningWallet),
    current: types.maybe(types.reference(LightningWallet)),
  })
  .views((self => ({
    get hasLightningWallet(){
      return self.wallets.length > 0
    },
    get hasReachedLimitation() {
      return self.wallets.length >= 10
    },
    get nextWalletName(){
      const prefix = "Lightning"
      const index = self.wallets.length
      return index ? `${prefix} ${index + 1}` : prefix;
    }
  })))
  .actions((self => ({
    createWallet(walletInfo: any): any {
      const wallet = self.wallets.find((wallet) => wallet.userId === walletInfo.userId);
      if (wallet) return wallet;
      return LightningWallet.create(walletInfo);
    },
    applyWallet(wallet: any) {
      self.wallets.push(wallet);
      self.current = wallet;
    },
    switchWallet(userId: string) {
      const existWallet = self.wallets.find((wallet) => wallet.userId === userId);
      if (!existWallet) throw new Error(`#store_error: cannot find wallet#${userId}`);
      self.current = existWallet;
    },
    removeWallet(userId: string) {
      const walletToRemove = self.wallets.find((wallet) => wallet.userId === userId);
      if (!walletToRemove) throw new Error(`#store_error: cannot find wallet#${userId}`);
      self.wallets.remove(walletToRemove);
      self.current = undefined
    }
  })))

export default Lightning;
