import { getAppStore } from '../../mobx';
import { BaseError } from '../base';
import { PsbtValidateErrors, SnapRequestErrors } from './errors';

export class SnapError extends BaseError {
  constructor(message: string) {
    const userFriendlyError = mapErrorToUserFriendlyError(message);
    super(userFriendlyError.code);
    this.name = userFriendlyError.name;
    this.message = userFriendlyError.message;
  }
}

export const mapErrorToUserFriendlyError = (message: string) => {
  const psbtValidateError = PsbtValidateErrors.find(item => message.startsWith(item.message));
  const snapRequestError = SnapRequestErrors.find(item => message.startsWith(item.message));

  if(psbtValidateError) {
    switch (psbtValidateError.name) {
      case 'FeeTooHigh':
        return { ...psbtValidateError, message: 'Fee too high' };
      default:
        return { ...psbtValidateError, message: 'Transaction is invalid' };
    }
  }

  if(snapRequestError) {
    switch (snapRequestError.name) {
      case 'NoPermission':
        if (snapRequestError.code === 20000) {
          const store = getAppStore();
          store.runtime.setConnected(false);
          store.resetStore();
        }
        return { ...snapRequestError, message: 'This error is usually caused by resetting the recovery phrase, please try to reinstall MetaMask' };
      case 'SignInvalidPath':
        return { ...snapRequestError, message: 'Sign transaction failed' };
      case 'ScriptTypeNotSupport':
      case 'MethodNotSupport':
      case 'ActionNotSupport':
        return { ...snapRequestError, message: 'Request error' };
      default:
        return snapRequestError;
    }
  }

  return { message: message, code: 0, name: 'UnknownSnapError' };
};
