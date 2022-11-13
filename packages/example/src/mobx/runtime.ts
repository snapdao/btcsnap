import { types } from 'mobx-state-tree';

export enum AppStatus {
  Connect = 'connect',
  ConnectClosed = 'connectClosed',
  Register = "register",
  FetchBalance = "fetchBalance",
  RefreshApp = "refreshApp",
  Ready = "ready"
}

export const runtimeInitialState = {
  status: AppStatus.Ready,
  connected: false,
  currencyRate: 0,
}

const Runtime = types
  .model('Runtime', {
    status: types.enumeration(Object.values(AppStatus)),
    connected: types.boolean,
    currencyRate: types.number,
  })
  .views((self) => ({
    get isLoading() {
      return self.status === AppStatus.Register || self.status === AppStatus.FetchBalance
    }
  }))
  .actions((self) => ({
    setStatus: (status: AppStatus) => {
      self.status = status
    },
    setConnected: (hasConnected: boolean) => {
      self.connected = hasConnected
    },
    setCurrencyRate: (currencyRate: number) => {
      self.currencyRate = currencyRate;
    }
  }))
  .actions((self) => ({
    continueConnect: () => {
      self.status = AppStatus.Connect
    },
  }))

export default Runtime;
