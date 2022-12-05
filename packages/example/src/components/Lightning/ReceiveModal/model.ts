import { trackLightningReceive } from './../../../tracking/events/index';
import lightningPayReq from 'bolt11';
import { satoshiToBTC } from './../../../lib/helper';
import { BigNumber } from 'bignumber.js';
import { makeAutoObservable } from 'mobx';
import { BitcoinUnit } from '../../../interface';
import { btcToSatoshi } from '../../../lib/helper';
import { addInvoice } from '../../../api/lightning/addInvoice';

const clearEndZeros = (str: string) => str.replace(/\.0+$/, '');

export enum ReceiveStep {
  Create,
  Invoice,
}

class ReceiveViewModel {
  step = ReceiveStep.Create;
  amount = '';
  description = '';
  currencyRate: number | null = null;
  currUnit: BitcoinUnit = BitcoinUnit.Sats;
  defaultUnit: BitcoinUnit = BitcoinUnit.Sats;

  isCreating = false;
  qrcode = '';
  expireCountDown = 0;
  expiredDate?: string = '';
  downloadImageReady = false;

  constructor(defaultUnit: BitcoinUnit, currencyRate: number) {
    if (defaultUnit) {
      this.defaultUnit = defaultUnit;
      this.currUnit = defaultUnit;
    }
    this.currencyRate = currencyRate;
    makeAutoObservable(this);
  }

  get secondAmountText() {
    if (this.amount === '' || !this.currencyRate) return '0';

    let result = '';

    switch (this.currUnit) {
      case BitcoinUnit.Sats:
        result = BigNumber(
          satoshiToBTC(
            BigNumber(this.amount).multipliedBy(this.currencyRate).toNumber(),
          ),
        ).toFixed(2);
        break;
      case BitcoinUnit.BTC:
        result = BigNumber(this.amount)
          .multipliedBy(this.currencyRate)
          .toFixed(2);
        break;
      case BitcoinUnit.Currency:
        switch (this.defaultUnit) {
          case BitcoinUnit.BTC:
            result = BigNumber(this.amount)
              .dividedBy(this.currencyRate)
              .toFixed(8);
            break;
          case BitcoinUnit.Sats:
            result = BigNumber(
              btcToSatoshi(
                BigNumber(this.amount).dividedBy(this.currencyRate).toNumber(),
              ),
            ).toString();
            break;
        }
    }

    return clearEndZeros(result);
  }

  get mainUnit() {
    return this.currUnit === BitcoinUnit.Currency ? 'USD' : this.currUnit;
  }

  get amountText() {
    if (this.amount === '' || !this.currencyRate) return '0';

    let result = '';

    switch (this.currUnit) {
      case BitcoinUnit.BTC:
        result = satoshiToBTC(BigNumber(this.amount).toNumber()).toString();
        break;
      case BitcoinUnit.Sats:
        result = this.amount;
        break;
      case BitcoinUnit.Currency:
        switch (this.defaultUnit) {
          case BitcoinUnit.BTC:
            result = BigNumber(
              BigNumber(this.amount).dividedBy(this.currencyRate).toNumber(),
            ).toFixed(8);
            break;
          case BitcoinUnit.Sats:
            result = BigNumber(
              btcToSatoshi(
                BigNumber(this.amount).dividedBy(this.currencyRate).toNumber(),
              ),
            ).toFixed(2);
            break;
        }
    }

    return clearEndZeros(result);
  }

  get isShowCurrency() {
    return this.mainUnit === 'USD';
  }

  get secondUnit() {
    switch (this.currUnit) {
      case BitcoinUnit.BTC:
      case BitcoinUnit.Sats:
        return 'USD';
      case BitcoinUnit.Currency:
        return this.defaultUnit;
    }
  }

  get amountLength() {
    return this.amount?.length || 1;
  }

  setDownloadImageReady(isReady: boolean) {
    this.downloadImageReady = isReady;
  }

  onChangeAmount(value: string) {
    this.amount = value;
  }

  onChangeViewUnit() {
    this.amount =
      this.secondAmountText === '0'
        ? ''
        : BigNumber(this.secondAmountText).toString();

    this.currUnit =
      this.currUnit === this.defaultUnit
        ? BitcoinUnit.Currency
        : this.defaultUnit;
  }

  onChangeDescription(value: string) {
    this.description = value;
  }

  onChangeStep(step: ReceiveStep) {
    this.step = step;
  }

  get receiveAmount() {
    if (this.amountText === '' || !this.currencyRate) return 0;
    const amountNumber = BigNumber(this.amount).toNumber();

    switch (this.currUnit) {
      case BitcoinUnit.BTC:
        return btcToSatoshi(amountNumber);
      case BitcoinUnit.Currency:
        switch (this.defaultUnit as Exclude<BitcoinUnit, BitcoinUnit.Currency>) {
          case BitcoinUnit.BTC:
            return btcToSatoshi(BigNumber(this.secondAmountText).toNumber());
          case BitcoinUnit.Sats:
            return BigNumber(this.secondAmountText).toNumber();
          default:
            return amountNumber;
        }
      default:
        return amountNumber;
    }
  }

  updateCreatedInvoice(paymentRequest: string) {
    const decodeData = lightningPayReq.decode(paymentRequest);
    this.qrcode = paymentRequest;
    this.expireCountDown =
      (decodeData.timeExpireDate || 0) * 1000 - new Date().getTime();
    this.expiredDate = decodeData.timeExpireDateString;
    this.amount = decodeData.satoshis?.toString() || '';
    this.description = (decodeData.tags.find(
      (tag) => tag.tagName === 'description',
    )?.data as string) || '';
    this.step = ReceiveStep.Invoice;
  }

  async onCreateReceive() {
    try {
      this.isCreating = true;
      trackLightningReceive({
        step: 'create'
      });
      const res = await addInvoice({
        amount: this.receiveAmount,
        memo: this.description,
      });
      trackLightningReceive({
        step: 'result',
        value: 'success'
      });
      this.updateCreatedInvoice(res.paymentRequest);
      return res;
    } catch (e) {
      trackLightningReceive({
        step: 'result',
        value: 'failed'
      });
      this.isCreating = false;
      throw e;
    }
  }
}

export default ReceiveViewModel;
