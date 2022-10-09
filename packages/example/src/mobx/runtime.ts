import { types } from 'mobx-state-tree';

export enum AppStatus {
  Connect = 'connect',
  ConnectClosed = 'connectClosed',
  Register = "register",
  FetchBalance = "fetchBalance",
  Ready = "ready"
}

export const runtimeInitialState = {
  status: AppStatus.Ready,
  connected: false
}

const Runtime = types
  .model('Runtime', {
    status: types.enumeration(Object.values(AppStatus)),
    connected: types.boolean,
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
  }))
  .actions((self) => ({
    continueConnect: () => {
      self.status = AppStatus.Connect
    },
  }))

export default Runtime;
