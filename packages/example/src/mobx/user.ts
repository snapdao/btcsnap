import { types } from 'mobx-state-tree';
import { BitcoinUnit } from '../interface';

export enum LNWalletStepStatus {
  Default,
  Ready,
  UserGuide,
  Done,
}

export const userInitialState = {
  isAgreeCookie: false,
  LNWalletStep: LNWalletStepStatus.Default,
  bitcoinUnit: BitcoinUnit.BTC,
  hasReadLightningNotice: false,
};

const User = types
  .model('User', {
    bitcoinWalletName: types.optional(types.string, 'Bitcoin'),
    isAgreeCookie: types.boolean,
    LNWalletStep: types.optional(types.number, LNWalletStepStatus.Default),
    bitcoinUnit: types.optional(
      types.enumeration(Object.values(BitcoinUnit)),
      BitcoinUnit.BTC,
    ),
    hasReadLightningNotice: types.optional(types.boolean, false),
  })
  .actions((self) => ({
    agreeCookie: () => {
      self.isAgreeCookie = true;
    },
    setLNWalletStep: (status: LNWalletStepStatus) => {
      self.LNWalletStep = status;
    },
    setBitcoinUnit: (targetUnit: BitcoinUnit) => {
      self.bitcoinUnit = targetUnit;
    },
    updateUser(bitcoinWalletName: string) {
      self.bitcoinWalletName = bitcoinWalletName;
    },
    setReadLightningNotice: () => {
      self.hasReadLightningNotice = true;
    }
  }));

export default User;
