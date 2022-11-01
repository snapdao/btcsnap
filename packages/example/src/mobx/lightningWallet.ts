import {types} from 'mobx-state-tree';

const LightningWallet = types
  .model('LightningWallet', {
    id: types.identifier,
    userId: types.string,
    name: types.string,
  })

export default LightningWallet;
