import { types } from 'mobx-state-tree';
import LightningWallet from './lightningWallet';
import { ILightningWallet, ILightningWalletIn } from './types';

export const lightningInitialState = {
  wallets: [],
  current: undefined,
};

const Lightning = types
  .model('Lightning', {
    wallets: types.array(LightningWallet),
    current: types.maybe(types.reference(LightningWallet)),
  })
  .views((self) => ({
    get hasLightningWallet() {
      return self.wallets.length > 0;
    },
    get hasReachedLimitation() {
      return self.wallets.length >= 10;
    },
    get walletLength() {
      return self.wallets.length;
    },
    get nextWalletName() {
      const prefix = 'Lightning';
      const lastIndex = self.wallets.at(-1)?.name.match(/\d+$/);
      const index = (lastIndex && +lastIndex) || self.wallets.length;
      return index ? `${prefix} ${index + 1}` : prefix;
    },
    getWalletByUserId(userId: string) {
      return self.wallets.find((wallet) => wallet.userId === userId);
    },
  }))
  .actions((self) => ({
    createWallet(walletInfo: ILightningWalletIn): ILightningWallet {
      const wallet = self.wallets.find(
        (wallet) => wallet.userId === walletInfo.userId,
      );
      if (wallet) return wallet;
      return LightningWallet.create(walletInfo);
    },
    applyWallet(otherWallet: any) {
      const storedWallet = self.wallets.find(
        (wallet) => wallet.userId === otherWallet.userId,
      );
      if (!storedWallet) {
        self.wallets.push(otherWallet);
      }
      self.current = otherWallet;
    },
    switchWallet(userId: string) {
      const existWallet = self.wallets.find(
        (wallet) => wallet.userId === userId,
      );
      if (!existWallet)
        throw new Error(`#store_error: cannot find wallet#${userId}`);
      self.current = existWallet;
    },
    removeWallet(userId: string) {
      const walletToRemove = self.wallets.find(
        (wallet) => wallet.userId === userId,
      );
      if (!walletToRemove)
        throw new Error(`#store_error: cannot find wallet#${userId}`);
      self.wallets.remove(walletToRemove);
      self.current = undefined;
    },
  }));

export default Lightning;
