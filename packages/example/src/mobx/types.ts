import { Instance, SnapshotIn, SnapshotOut } from 'mobx-state-tree';
import Account from './account';
import Address from './address';
import AppStore from './store';
import LightningWallet from './lightningWallet';

export interface IStore extends Instance<typeof AppStore> {}

export interface IAccountIn extends SnapshotIn<typeof Account> {}
export interface IAccountOut extends SnapshotOut<typeof Account> {}
export interface IAccount extends Instance<typeof Account> {}

export interface IAddressIn extends SnapshotIn<typeof Address> {
  parent: string;
}

export interface ILightningWalletIn extends SnapshotIn<typeof LightningWallet> {}
export interface ILightningWalletOut extends SnapshotOut<typeof LightningWallet> {}
export interface ILightningWallet extends Instance<typeof LightningWallet> {}
