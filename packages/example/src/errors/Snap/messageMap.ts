export enum PsbtValidateError {
  InputsDataInsufficient = 'Not all inputs have prev Tx raw hex',
  InputsNetworkNotMatch = 'Not every input matches network',
  OutputsNetworkNotMatch = 'Not every output matches network',
  InputNotSpendable = 'Not all inputs belongs to current account',
  ChangeAddressInvalid = `Change address doesn't belongs to current account`,
  FeeTooHigh = 'Too much fee',
  AmountNotMatch = 'Transaction input amount not match'
}

export enum SnapRequestError {
  RejectKey = 'User reject to access the key',
  RejectSign = 'User reject the sign request',
  SignInvalidPath = 'invalid path',
  SignFailed = 'Sign transaction failed',
  NetworkNotMatch = 'Network not match',
  ScriptTypeNotSupport = 'ScriptType is not supported.',
  MethodNotSupport = 'Method not found.',
  ActionNotSupport = 'Action not supported',
}

export const mapErrorToUserFriendlyMessage = (message:string) => {
  if(message in PsbtValidateError) {
   switch (message) {
     case PsbtValidateError.FeeTooHigh:
       return "Fee too high";
     default:
       return "Transaction is invalid";
   } 
  }
  if(message in SnapRequestError){
    switch (message) {
      case SnapRequestError.SignInvalidPath:
        return "Sign transaction failed";
      case SnapRequestError.MethodNotSupport:
      case SnapRequestError.ActionNotSupport:
      case SnapRequestError.ScriptTypeNotSupport:
        return "Request error"
      default:
        return message;
    }
  }
  return message;
}
