import { Instance, SnapshotIn, SnapshotOut } from 'mobx-state-tree';
import Account from './account';
import Address from './address';
import AppStore from './store';
import LightningWallet from './lightningWallet';
import Wallet from './wallet';

export type IStore = Instance<typeof AppStore>

export type IAccountIn = SnapshotIn<typeof Account>
export type IAccountOut = SnapshotOut<typeof Account>
export type IAccount = Instance<typeof Account>

export interface IAddressIn extends SnapshotIn<typeof Address> {
  parent: string;
}

export type ILightningWalletIn = SnapshotIn<typeof LightningWallet>
export type ILightningWalletOut = SnapshotOut<typeof LightningWallet>
export type ILightningWallet = Instance<typeof LightningWallet>

export type IWalletIn = SnapshotIn<typeof Wallet>
