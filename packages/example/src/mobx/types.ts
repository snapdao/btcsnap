import { Instance, SnapshotIn, SnapshotOut } from 'mobx-state-tree';
import Account from './account';
import Address from './address';
import AppStore from './store';

export interface IStore extends Instance<typeof AppStore> {}

export interface IAccountIn extends SnapshotIn<typeof Account> {}
export interface IAccountOut extends SnapshotOut<typeof Account> {}
export interface IAccount extends Instance<typeof Account> {}

export interface IAddressIn extends SnapshotIn<typeof Address> {
  parent: string;
}
