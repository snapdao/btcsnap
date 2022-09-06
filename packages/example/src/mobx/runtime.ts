import { types } from 'mobx-state-tree';

export enum AppStatus {
  ConnectMM = "connectMM",
  FetchBalance = "fetchBalance",
  Ready = "ready"
}

export const runtimeInitialState = {
  status: AppStatus.Ready
}

const Runtime = types
  .model('Runtime', {
    status: types.enumeration(Object.values(AppStatus)),
  })
  .actions(() => ({
    updateStatus: (status: AppStatus) => {
      self.status = status
    }
  }))

export default Runtime;
