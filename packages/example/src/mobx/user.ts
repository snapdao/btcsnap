import {types} from 'mobx-state-tree';

export const userInitialState = {
  isAgreeCookie: false,
};

const User = types
  .model('User', {
    isAgreeCookie: types.boolean,
  })
  .actions((self) => ({
    agreeCookie:() => {
      self.isAgreeCookie = true
    }
  }))

export default User;
