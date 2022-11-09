export const RequestErrors = {
  NoPermission: {
    code: 20000,
    message: 'Unauthorized to perform action.'
  },
  RejectKey: {
    code: 20001,
    message: 'User reject to access the key'
  },
  RejectSign: {
    code: 20002,
    message: 'User reject the sign request'
  },
  SignInvalidPath: {
    code: 20003,
    message:'invalid path'
  },
  SignFailed: {
    code: 20004,
    message: 'Sign transaction failed'
  },
  NetworkNotMatch: {
    code: 20005,
    message: 'Network not match'
  },
  ScriptTypeNotSupport: {
    code: 20006,
    message: 'ScriptType is not supported.'
  },
  MethodNotSupport: {
    code: 20007,
    message: 'Method not found.'
  },
  ActionNotSupport: {
    code: 20008,
    message: 'Action not supported'
  },
  UserReject: {
    code: 20009,
    message: 'User rejected the request.'
  },
  KeyNotSupported: {
    code: 20010,
    message: 'Key cannot be recognized'
  },
  DomainNotAllowed: {
    code: 20011,
    message: 'Domain not allowed'
  }
}
