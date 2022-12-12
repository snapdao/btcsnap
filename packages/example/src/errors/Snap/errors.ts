export const PsbtValidateErrors = [
  {
    code: 10001,
    name: 'InputsDataInsufficient',
    message: 'Not all inputs have prev Tx raw hex',
  },
  {
    code: 10002,
    name: 'InputsNetworkNotMatch',
    message: 'Not every input matches network'
  },
  {
    code: 10003,
    name: 'OutputsNetworkNotMatch',
    message: 'Not every input matches network'
  },
  {
    code: 10004,
    name: 'InputNotSpendable',
    message: 'Not all inputs belongs to current account'
  },
  {
    code: 10005,
    name: 'ChangeAddressInvalid',
    message: 'Change address doesn\'t belongs to current account'
  },
  {
    code: 10006,
    name: 'FeeTooHigh',
    message: 'Too much fee'
  },
  {
    code: 10007,
    name: 'AmountNotMatch',
    message: 'Transaction input amount not match'
  },
];

export const SnapRequestErrors = [
  {
    code: 20000,
    name: 'NoPermission',
    message: 'Unauthorized to perform action.'
  },
  {
    code: 20001,
    name: 'RejectKey',
    message: 'User reject to access the key'
  },
  {
    code: 20002,
    name: 'RejectSign',
    message: 'User reject the sign request'
  },
  {
    code: 20003,
    name: 'SignInvalidPath',
    message:'invalid path'
  },
  {
    code: 20004,
    name: 'SignFailed',
    message: 'Sign transaction failed'
  },
  {
    code: 20005,
    name: 'NetworkNotMatch',
    message: 'Network not match'
  },
  {
    code: 20006,
    name: 'ScriptTypeNotSupport',
    message: 'ScriptType is not supported.'
  },
  {
    code: 20007,
    name: 'MethodNotSupport',
    message: 'Method not found.'
  },
  {
    code: 20008,
    name: 'ActionNotSupport',
    message: 'Action not supported'
  },
  {
    code: 20009,
    name: 'UserReject',
    message: 'User rejected the request.'
  }
];
