import lightningPayReq from 'bolt11';
import { satoshiToBTC } from './../../../lib/helper';
import { BigNumber } from 'bignumber.js';
import { makeAutoObservable } from 'mobx';
import { BitcoinUnit } from '../../../interface';
import { btcToSatoshi } from '../../../lib/helper';
import { addInvoice } from '../../../api/lightning/addInvoice';
import { covertSecondsToHM } from '../../../lib/datetime';

const clearEndZeros = (str: string) => str.replace(/[\.]0+$/, '');

export enum ReceiveStep {
  Create,
  Invoice,
}

class ReceiveViewModel {
  step = ReceiveStep.Create;
  amount = '';
  description = ' ';
  currencyRate: number | null = null;
  currUnit: BitcoinUnit = BitcoinUnit.Sats;
  defaultUnit: BitcoinUnit = BitcoinUnit.Sats;

  isCreating = false;
  qrcode = '';
  expiredDate: number = 0;

  constructor(defaultUnit: BitcoinUnit, currencyRate: number) {
    if (defaultUnit) {
      this.defaultUnit = defaultUnit;
      this.currUnit = defaultUnit;
    }
    this.currencyRate = currencyRate;
    makeAutoObservable(this);
  }

  get amountText() {
    return this.amount;
  }

  get secondAmountText() {
    if (this.amountText === '' || !this.currencyRate) return '0';

    return clearEndZeros(
      {
        [BitcoinUnit.Sats]: BigNumber(
          satoshiToBTC(
            BigNumber(this.amountText)
              .multipliedBy(this.currencyRate)
              .toNumber(),
          ),
        ).toFixed(2),
        [BitcoinUnit.BTC]: BigNumber(this.amountText)
          .multipliedBy(this.currencyRate)
          .toFixed(2),
        [BitcoinUnit.Currency]: {
          [BitcoinUnit.BTC]: BigNumber(this.amountText)
            .dividedBy(this.currencyRate)
            .toFixed(8),
          [BitcoinUnit.Sats]: BigNumber(
            btcToSatoshi(
              BigNumber(this.amountText)
                .dividedBy(this.currencyRate)
                .toNumber(),
            ),
          ).toString(),
        }[this.defaultUnit as Exclude<BitcoinUnit, BitcoinUnit.Currency>],
      }[this.currUnit],
    );
  }

  get mainUnit() {
    return (
      {
        [BitcoinUnit.Currency]: 'USD',
      }[this.currUnit as Extract<BitcoinUnit, BitcoinUnit.Currency>] ||
      this.currUnit
    );
  }

  get secondUnit() {
    return (
      {
        [BitcoinUnit.Currency]: this.defaultUnit,
        [BitcoinUnit.BTC]: 'USD',
        [BitcoinUnit.Sats]: 'USD',
      }[this.currUnit] + ''
    );
  }

  get amountLength() {
    return this.amountText?.length || 1;
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

  getSatoshiFromAmount() {
    if (this.amountText === '' || !this.currencyRate) return 0;
    const amountNumber = BigNumber(this.amount).toNumber();

    return (
      {
        [BitcoinUnit.BTC]: btcToSatoshi(amountNumber),
        [BitcoinUnit.Currency]: {
          [BitcoinUnit.BTC]: btcToSatoshi(
            BigNumber(this.secondAmountText).toNumber(),
          ),
          [BitcoinUnit.Sats]: BigNumber(this.secondAmountText).toNumber(),
        }[this.defaultUnit as Exclude<BitcoinUnit, BitcoinUnit.Currency>],
      }[this.currUnit as Exclude<BitcoinUnit, BitcoinUnit.Sats>] || amountNumber
    );
  }

  async onCreateReceive() {
    this.isCreating = true;
    const res = await addInvoice({
      amount: this.getSatoshiFromAmount(),
      memo: this.description,
    });
    const decodeData = lightningPayReq.decode(res.paymentRequest);
    this.qrcode = res.paymentRequest;
    this.expiredDate =
      (decodeData.timeExpireDate || 0) * 1000 - new Date().getTime();
    this.step = ReceiveStep.Invoice;
    this.isCreating = false;
    return res;
  }
}

export default ReceiveViewModel;
