import { makeAutoObservable } from 'mobx';
import { trackTopUp } from '../../../tracking';
import { mapErrorToUserFriendlyError } from '../../../errors/Snap/SnapError';
import { logger } from '../../../logger';
import { queryMercuryoSignature } from '../../../api/v1/mercuryoSignature';
import { FiatRecord, queryFiatRecord } from '../../../api/v1/fiatRecord';
import { ENVIRONMENT, FIAT_MRCR_WIDGET_ID } from '../../../config';

class TopUpViewModel {
  public to = '';
  public amountText = '';

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
    try {
      this.setIsGetSignature(true);
      const res = await queryMercuryoSignature(this.to, path, xfp);
      this.setTxId(res.txId);

      this.setIsGetSignature(false);
      this.setStatus('pending');
      const host = ENVIRONMENT !== 'development' ? 'exchange.mercuryo.io' : 'sandbox-exchange.mrcr.io'
      window.open(`https://${host}/?widget_id=${FIAT_MRCR_WIDGET_ID}&type=buy&currency=BTC&merchant_transaction_id=${this.txId}&address=${this.to}&signature=${res.signature}`);
    } catch(e) {
      logger.error(e);
      if (typeof e === 'string') {
        this.errorMessage = mapErrorToUserFriendlyError(e);
      } else if (e instanceof Error) {
        this.errorMessage = mapErrorToUserFriendlyError(e.message || 'refresh error');
      }
      this.setIsGetSignature(false);
    }
  }

  setErrorMessage = (value: string) => {
    this.errorMessage.message = value
  }

  refreshStatus = async () => {
    try {
      if (!this.txId) return;
      const res = await queryFiatRecord(this.txId);

      if ((res.type === 'buy' && res.status === 'paid') || res.type === 'withdraw') {
        this.status = 'success';
        this.amountText = res.amount;
        trackTopUp({
          type: 'bitcoin',
          step: 'result',
          value: 'success'
        })
      } else if ((['cancelled', 'order_failed', 'descriptor_failed'] as FiatRecord['status'][]).includes(res.status)) {
        this.status = 'failed';
        this.amountText = res.amount;
        const errMsg = { cancelled: 'Transaction cancelled' }[res.status as string] || 'Payment failed, please check the email sent by Mercuryo or go to mercuryo.io and contact live Chat';
        throw new Error(errMsg)
      }
    } catch (e) {
      logger.error(e);
      trackTopUp({
        type: 'bitcoin',
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
