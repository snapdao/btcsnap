import { types } from 'mobx-state-tree';
import { BitcoinUnit } from '../interface';

const LightningWallet = types
  .model('LightningWallet', {
    id: types.identifier,
    userId: types.string,
    name: types.string,
    unit: types.enumeration(Object.values(BitcoinUnit)),
  })
  .actions((self) => ({
    setUnit: (unit: BitcoinUnit) => {
      self.unit = unit;
    },
    setName: (name: string) => {
      self.name = name;
    },
  }));

export default LightningWallet;
