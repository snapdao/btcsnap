import { types } from 'mobx-state-tree';

export enum AppStatus {
  Register = "register",
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
  .actions((self) => ({
    setStatus: (status: AppStatus) => {
      self.status = status
    }
  }))

export default Runtime;
