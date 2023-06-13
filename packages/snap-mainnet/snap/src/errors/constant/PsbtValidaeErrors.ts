export const PsbtValidateErrors = {
  InputsDataInsufficient: {
    code: 10001,
    message: 'Not all inputs have prev Tx raw hex',
  },
  InputsNetworkNotMatch: {
    code: 10002,
    message: 'Not every input matches network'
  },
  OutputsNetworkNotMatch: {
    code: 10003,
    message: 'Not every output matches network'
  },
  InputNotSpendable: {
    code: 10004,
    message: 'Not all inputs belongs to current account'
  },
  ChangeAddressInvalid: {
    code: 10005,
    message: `Change address doesn't belongs to current account`
  },
  FeeTooHigh: {
    code: 10006,
    message: 'Too much fee'
  },
  AmountNotMatch: {
    code: 10007,
    message: 'Transaction input amount not match'
  }
}
