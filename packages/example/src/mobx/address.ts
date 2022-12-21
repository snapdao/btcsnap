import { IAnyModelType, types } from 'mobx-state-tree';
import { Coins } from '../constant/supportedCoins';
import Account from './account';

const Address = types
  .model('Address', {
    id: types.identifier,
    address: types.string,
    parent: types.reference(types.late((): IAnyModelType => Account)),
    coinCode: types.enumeration(Coins),
    change: types.number,
    index: types.number,
  });

export default Address;
