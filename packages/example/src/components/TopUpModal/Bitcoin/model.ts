import { makeAutoObservable } from 'mobx';
import { trackTopUp } from '../../../tracking';
import { mapErrorToUserFriendlyError } from '../../../errors/Snap/SnapError';
import { logger } from '../../../logger';

class TopUpViewModel {
  public to = '';
  public amountText = '5555';

  public status: 'initial' | 'pending' | 'timeout' | 'success' | 'failed' = 'initial';

  public errorMessage: {message: string, code: number} = { message: '', code: 0 };

  private txId?: string;

  public isRefresh = false;

  public utxoLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  get formattedTo() {
    if (this.to.length > 12) {
      const head = this.to.slice(0, 6);
      const tail = this.to.slice(this.to.length - 6);
      return `${head}...${tail}`;
    }
    return this.to;
  }

  resetState = () => {
    this.status = 'initial';
    this.txId = undefined;
    this.errorMessage = { message: '', code: 0 };
    this.setIsRefresh(false);
    this.to = '';
    this.amountText = '';
  };

  setUtxoLoading = (value: boolean) => {
    this.utxoLoading = value;
  };

  setStatus (status: typeof this.status) {
    this.status = status;
  }

  setTo = (value: string) => {
    this.to = value;
  };

  get isEmptyTo() {
    return this.to === '';
  }

  setIsRefresh = (bool: boolean) => {
    this.isRefresh = bool;
  }

  refreshStatus = async () => {
    let timer: ReturnType<typeof setTimeout> = 0 as any;
    try {
      this.setIsRefresh(true);
      this.txId = 'asdfafsd';
      timer = setTimeout(() => {
        this.status = 'success';
        this.setIsRefresh(false);
      }, 5000);

    } catch (e) {
      timer && clearTimeout(timer)
      logger.error(e);
      trackTopUp({
        type: 'lightning',
        lightningType: 'internal',
        step: 'result',
        value: 'failed'
      });
      if (typeof e === 'string') {
        this.errorMessage = mapErrorToUserFriendlyError(e);
      } else if (e instanceof Error) {
        this.errorMessage = mapErrorToUserFriendlyError(e.message || 'refresh error');
      }
      this.status = 'failed';
      this.setIsRefresh(false);
    }
  };
  
}

export default TopUpViewModel;
