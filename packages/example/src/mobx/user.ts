import {types} from 'mobx-state-tree';

export enum LNWalletStepStatus {
  Default,
  CreateWallet,
  UserGuide,
  Done
}

export const userInitialState = {
  isAgreeCookie: false,
  LNWalletStep: LNWalletStepStatus.Default
};

const User = types
  .model('User', {
    isAgreeCookie: types.boolean,
    LNWalletStep: types.optional(types.number, LNWalletStepStatus.Default)
  })
  .actions((self) => ({
    agreeCookie:() => {
      self.isAgreeCookie = true
    },
    setLNWalletStep:(status:number) => {
      self.LNWalletStep = status
    }
  }))

export default User;
