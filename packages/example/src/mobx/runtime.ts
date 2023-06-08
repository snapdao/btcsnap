import { types } from 'mobx-state-tree';
import Wallet from './wallet';
import { IWalletIn } from './types';

export enum AppStatus {
  Connect = 'connect',
  ConnectClosed = 'connectClosed',
  Register = 'register',
  FetchBalance = 'fetchBalance',
  RefreshApp = 'refreshApp',
  Ready = 'ready',
}

export enum LightningAppStatus {
  Ready = 'ready',
  Expired = 'expired',
}

const formatAmount = (amount: number | null | undefined): number => {
  if (amount === null || amount === undefined) {
    return 0.00;
  }
  try {
    const parsedAmount = parseFloat(`${amount}`);
    if (isNaN(parsedAmount)) {
      return 0.00;
    }
    return parseFloat(parsedAmount.toFixed(2));
  } catch (error) {
    return 0.00;
  }
};

export const runtimeInitialState = {
  status: AppStatus.Ready,
  lightningAppStatus: LightningAppStatus.Ready,
  connected: false,
  currencyRate: 0,
  wallets: [],
};

const Runtime = types
  .model('Runtime', {
    status: types.enumeration(Object.values(AppStatus)),
    lightningAppStatus: types.enumeration(Object.values(LightningAppStatus)),
    connected: types.boolean,
    currencyRate: types.number,
    wallets: types.array(Wallet),
  })
  .views((self) => ({
    get isLoading() {
      return self.status === AppStatus.FetchBalance;
    },
    getWallet(walletId: string){
      return self.wallets.find(wallet => wallet.id === walletId);
    }
  }))
  .views((self) => ({
    getWalletBalance(walletId: string): number {
      return self.getWallet(walletId)?.balance || 0;
    }
  }))
  .actions((self) => ({
    setStatus: (status: AppStatus) => {
      self.status = status;
    },
    setConnected: (hasConnected: boolean) => {
      self.connected = hasConnected;
    },
    setCurrencyRate: (currencyRate: number) => {
      self.currencyRate = formatAmount(currencyRate);
    },
    setLightningAppStatus: (status: LightningAppStatus) => {
      self.lightningAppStatus = status;
    },
    addWallet: (wallet: IWalletIn) => {
      const newWallet = Wallet.create(wallet);
      self.wallets.push(newWallet);
    }
  }))
  .actions((self) => ({
    continueConnect: () => {
      self.status = AppStatus.Connect;
    },
    setBalanceForWallet: (walletId: string, balance: number) => {
      const wallet = self.getWallet(walletId);
      if(wallet){
        wallet.balance = balance;
        wallet.balanceFetched = true;
      } else {
        self.addWallet({
          id: walletId,
          balance,
          balanceFetched: true
        });
      }
    }
  }));

export default Runtime;
