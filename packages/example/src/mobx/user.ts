import {types} from 'mobx-state-tree';

export const userInitialState = {
  isAgreeCookie: false,
  isFirstLogin: false,
  isShowCreateLN: false,
  isShowUserGuide: false
};

const User = types
  .model('User', {
    isAgreeCookie: types.boolean,
    isFirstLogin: types.boolean,
    isShowCreateLN: types.boolean,
    isShowUserGuide: types.boolean
  })
  .actions((self) => ({
    agreeCookie:() => {
      self.isAgreeCookie = true
    },
    firstLogin:() => {
      self.isFirstLogin = true
    },
    showCreateLN:(status:boolean) => {
      self.isShowCreateLN = status
    },
    showUserGuide:(status:boolean) => {
      self.isShowUserGuide = status
    }
  }))

export default User;
