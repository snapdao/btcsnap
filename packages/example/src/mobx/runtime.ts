import { types } from 'mobx-state-tree';

export enum AppStatus {
  Register = "register",
  FetchBalance = "fetchBalance",
  Ready = "ready"
}

export const runtimeInitialState = {
  status: AppStatus.Ready,
  connected: false,
}

const Runtime = types
  .model('Runtime', {
    status: types.enumeration(Object.values(AppStatus)),
    connected: types.boolean,
  })
  .actions((self) => ({
    setStatus: (status: AppStatus) => {
      self.status = status
    },
    setConnected: (hasConnected: boolean) => {
      self.connected = hasConnected
    }
  }))

export default Runtime;
