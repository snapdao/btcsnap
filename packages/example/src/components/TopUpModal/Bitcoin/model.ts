import { makeAutoObservable } from 'mobx';
import { trackTopUp } from '../../../tracking';
import { mapErrorToUserFriendlyError } from '../../../errors/Snap/SnapError';
import { logger } from '../../../logger';
import { queryMercuryoSignature } from '../../../api/v1/mercuryoSignature';
import { address } from 'bitcoinjs-lib';
import { queryFiatRecord } from '../../../api/v1/fiatRecord';

class TopUpViewModel {
  public to = '';
  public amountText = '5555';

  public status: 'initial' | 'pending' | 'timeout' | 'success' | 'failed' = 'initial';

  public errorMessage: {message: string, code: number} = { message: '', code: 0 };

  public txId?: string;

  public isRefresh = false;

  public isGetSignature = false;

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

  setTxId = (value: string) => {
    this.txId = value;
  }

  get isEmptyTo() {
    return this.to === '';
  }

  setIsRefresh = (bool: boolean) => {
    this.isRefresh = bool;
  }

  setIsGetSignature = (bool: boolean) => {
    this.isGetSignature = bool;
  }

  confirmTopUp = async (path: string, xfp: string) => {
    this.setIsGetSignature(true);
    const res = await queryMercuryoSignature(this.to, path, xfp);
    console.log('res', res);
    this.setTxId(res.txId);

    this.setIsGetSignature(false);
    this.setStatus('pending');
    window.open(`https://sandbox-exchange.mrcr.io/?widget_id=98926ac6-70b2-4138-8431-a8b7e44fd61a&type=buy&currency=BTC&merchant_transaction_id=${this.txId}&address=${this.to}&signature=${res.signature}`);
  }

  refreshStatus = async () => {
    let timer: ReturnType<typeof setTimeout> = 0 as any;
    try {
      if (!this.txId) return;
      this.setIsRefresh(true);
      const res = await queryFiatRecord(this.txId);
      console.log('res', res);

      if ((res.type === 'buy' && res.status === 'paid') || res.type === 'withdraw') {
        this.status = 'success';
      }
      this.setIsRefresh(false);

      timer = setTimeout(() => {
        clearTimeout(timer);
      }, 10000);
    } catch (e) {
      timer && clearTimeout(timer);
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
