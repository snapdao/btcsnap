import {types} from 'mobx-state-tree';
import { BitcoinUnit } from "../interface";

export enum LNWalletStepStatus {
  Default,
  CreateWallet,
  UserGuide,
  Done
}

export const userInitialState = {
  isAgreeCookie: false,
  LNWalletStep: LNWalletStepStatus.Default,
  bitcoinUnit: BitcoinUnit.BTC
};

const User = types
  .model('User', {
    isAgreeCookie: types.boolean,
    LNWalletStep: types.optional(types.number, LNWalletStepStatus.Default),
    bitcoinUnit: types.enumeration(Object.values(BitcoinUnit)),
  })
  .actions((self) => ({
    agreeCookie:() => {
      self.isAgreeCookie = true
    },
    setLNWalletStep:(status:number) => {
      self.LNWalletStep = status
    },
    setBitcoinUnit: (targetUnit: BitcoinUnit) => {
      self.bitcoinUnit = targetUnit
    }
  }))

export default User;
