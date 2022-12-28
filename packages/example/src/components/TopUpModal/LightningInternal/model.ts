import { BigNumber } from 'bignumber.js';
import { makeAutoObservable, reaction } from 'mobx';
import {
  BitcoinNetwork,
  BitcoinScriptType,
  BitcoinUnit,
  Utxo,
} from '../../../interface';
import { generatePSBT, selectUtxos, SendInfo } from '../../../lib';
import validate, { Network } from 'bitcoin-address-validation';
import { signPsbt } from '../../../lib/snap';
import { getTransactionLink } from '../../../lib/explorer';
import { trackTopUp } from '../../../tracking';
import { FeeRate } from './types';
import { BroadcastData, pushTransaction } from '../../../api/v1/pushTransaction';
import { NETWORK_SCRIPT_TO_COIN } from '../../../constant/bitcoin';
import { DUST_THRESHOLD, validateTx } from '../../../lib/psbtValidator';
import { Psbt } from 'bitcoinjs-lib';
import { btcToSatoshi, satoshiToBTC } from '../../../lib/helper';
import { bitcoinUnitMap } from '../../../lib/unit';
import { mapErrorToUserFriendlyError } from '../../../errors/Snap/SnapError';
import { logger } from '../../../logger';

const dealWithDigital = (text: string, precision = 2) => {
  const digitalRegex =
    precision > 0
      ? new RegExp('(\\d+\\.?(\\d' + `{1,${precision}}` + ')?)')
      : new RegExp('(\\d+)');
  const digital = text.match(digitalRegex);
  if (digital === null) return '';
  else {
    return digital[0]
      .replace(/^0+/, '0')
      .replace(/^(0+)([1-9])+/, '$2')
      .trim();
  }
};

class TopUpViewModel {
  public to = '';
  public notes = '';
  private sendAmountText = '';
  private decimal = 8;
  private decimalFactor = new BigNumber(10).pow(this.decimal);
  private limitedDecimal = 8;
  public selectedFeeRate: keyof FeeRate = 'recommended';

  private sendMainUnit: BitcoinUnit;
  private sendSecondaryUnit: BitcoinUnit = BitcoinUnit.Currency;
  private sendSatoshis = new BigNumber(0);

  public status: 'initial' | 'success' | 'failed' = 'initial';

  public errorMessage: {message: string, code: number} = { message: '', code: 0 };
  public isAddressValid = true;

  public confirmOpen = false;

  private txId?: string;

  public isSending = false;

  public utxoLoading = false;

  constructor(
    private utxos: Utxo[],
    public feeRate: FeeRate,
    private exchangeRate: number,
    public network: BitcoinNetwork,
    public unit: BitcoinUnit,
    private scriptType: BitcoinScriptType,
    private sendInfo?: SendInfo,
  ) {
    this.sendMainUnit = unit;
    makeAutoObservable(this);
    reaction(
      () => this.status,
      (status) => {
        if (status !== 'initial') this.setConfirmOpen(false);
      },
    );
  }

  resetState = () => {
    this.status = 'initial';
    this.confirmOpen = false;
    this.txId = undefined;
    this.errorMessage = { message: '', code: 0 };
    this.isSending = false;
    this.to = '';
    this.sendAmountText = '';
    this.sendSatoshis = new BigNumber(0);
    this.sendSecondaryUnit = BitcoinUnit.Currency;
  };

  setConfirmOpen = (flag: boolean) => {
    this.confirmOpen = flag;
  };

  setSendInfo = (sendInfo: SendInfo) => {
    this.sendInfo = sendInfo;
  };

  setUtxos = (utxos: Utxo[]) => {
    this.utxos = utxos;
  };

  setUtxoLoading = (value: boolean) => {
    this.utxoLoading = value;
  };

  setNetwork = (network: BitcoinNetwork) => {
    this.network = network;
  };

  setTo = (value: string) => {
    this.to = value;
  };

  setNotes = (value: string) => {
    this.notes = value;
  };

  get sendInitUnit() {
    return bitcoinUnitMap[this.network][this.unit];
  }

  get sendCurrencyUnit() {
    return bitcoinUnitMap[this.network].Currency;
  }

  get mainUnit() {
    return bitcoinUnitMap[this.network][this.sendMainUnit];
  }

  get secondaryUnit() {
    return bitcoinUnitMap[this.network][this.sendSecondaryUnit];
  }

  get sendAmountMain() {
    return this.sendAmountText;
  }

  get sendAmountSecondary() {
    switch (this.sendSecondaryUnit) {
      case BitcoinUnit.BTC:
        return new BigNumber(
          satoshiToBTC(this.sendSatoshis.toNumber()),
        ).toFixed();
      case BitcoinUnit.Sats:
        return this.sendSatoshis.isNaN()
          ? '0.00'
          : this.sendSatoshis.toNumber();
      case BitcoinUnit.Currency:
        return this.sendSatoshis.isNaN()
          ? '0.00'
          : new BigNumber(
            satoshiToBTC(this.sendSatoshis.toNumber() * this.exchangeRate),
          ).toFixed(2);
    }
  }

  switchUnits = () => {
    const temp = this.sendMainUnit;
    this.sendMainUnit = this.sendSecondaryUnit;
    this.sendSecondaryUnit = temp;
    this.sendAmountText = '';
    this.sendSatoshis = new BigNumber(0);
  };

  get formattedTo() {
    if (this.to.length > 12) {
      const head = this.to.slice(0, 6);
      const tail = this.to.slice(this.to.length - 6);
      return `${head}...${tail}`;
    }
    return this.to;
  }

  setFeeRate = (feeRate: FeeRate) => (this.feeRate = feeRate);

  setSelectedFeeRate = (feeRate: keyof FeeRate) => {
    this.selectedFeeRate = feeRate;
    if (this.fee === 0) {
      this.sendAmountText = '';
      this.sendSatoshis = new BigNumber(0);
    }
  };

  get selectedResult() {
    if (this.sendSatoshis.gt(0)) {
      return selectUtxos(
        this.to,
        this.sendSatoshis.toNumber(),
        this.feeRate[this.selectedFeeRate],
        this.utxos,
      );
    }
    return {};
  }

  get fee() {
    if (this.selectedResult.fee)
      return this.selectedResult.fee;
    return 0;
  }

  getSelectedUtxoFee(feeRate: keyof FeeRate, countAvailable = false) {
    const selectedResult = selectUtxos(
      this.to,
      countAvailable ? 0 : this.sendSatoshis.toNumber(),
      this.feeRate[feeRate],
      this.utxos,
      countAvailable,
    );
    if (selectedResult.inputs && selectedResult.outputs && selectedResult.fee) {
      return selectedResult.fee;
    }
    return 0;
  }

  satoshiToCurrentMainUnit(satoshi: number) {
    switch (this.sendMainUnit) {
      case BitcoinUnit.BTC:
        return new BigNumber(satoshi).dividedBy(this.decimalFactor).toFixed();
      case BitcoinUnit.Sats:
        return satoshi.toString();
      case BitcoinUnit.Currency:
        return new BigNumber(satoshiToBTC(satoshi) * this.exchangeRate).toFixed(
          2,
        );
    }
  }

  get fees() {
    const feeRates: (keyof FeeRate)[] = ['low', 'recommended', 'high'];
    return feeRates.reduce((result, feeRate) => {
      return {
        ...result,
        [feeRate]: this.satoshiToCurrentMainUnit(
          this.getSelectedUtxoFee(feeRate, true),
        ),
      };
    }, {} as FeeRate);
  }

  get feeText() {
    return this.satoshiToCurrentMainUnit(this.fee);
  }

  get amountLength() {
    return this.sendAmountText?.length || 1;
  }

  get amountText() {
    return this.sendAmountText;
  }

  get totalAmount() {
    if (this.sendInitUnit === bitcoinUnitMap[this.network].BTC) {
      return this.sendSatoshis
        .plus(this.fee)
        .dividedBy(this.decimalFactor)
        .toString();
    } else {
      return this.sendSatoshis
        .plus(this.fee)
        .toString();
    }
  }

  get totalCurrency() {
    return (
      satoshiToBTC(this.sendSatoshis.plus(this.fee).toNumber()) *
      this.exchangeRate
    ).toFixed(2);
  }

  get isEmptyAmount() {
    return this.sendAmountText === '' || Number(this.sendAmountText) === 0;
  }

  get amountValid() {
    if (this.isEmptyAmount) return {
      valid: true,
    };
    if (this.sendSatoshis.lte(DUST_THRESHOLD)) return {
      valid: false,
      msg: 'Amount is too small',
    };
    if (this.balanceInSatoshi.gte(this.sendSatoshis.plus(this.fee))) {
      return {
        valid: true,
      };
    } else {
      return {
        valid: false,
        msg: 'Insufficient funds',
      };
    }
  }

  get isEmptyTo() {
    return this.to === '';
  }

  get toValid() {
    if (this.isEmptyTo) {
      this.isAddressValid = true;
      return true;
    };
    const network =
      this.network === BitcoinNetwork.Main ? Network.mainnet : Network.testnet;
    const isValid = validate(this.to, network);
    setTimeout(() => { this.isAddressValid = isValid; }, 500);
    return isValid;
  }

  get valid() {
    return (
      this.amountValid.valid && this.toValid && !this.isEmptyAmount && !this.isEmptyTo
    );
  }

  get availableAmount() {
    switch (this.unit) {
      case BitcoinUnit.BTC:
        return this.balanceInBtc;
      case BitcoinUnit.Sats:
        return this.balanceInSatoshi.toNumber();
    }
    return 0;
  }

  get balanceInSatoshi() {
    return this.utxos.reduce((acc, cur) => {
      return acc.plus(cur.value);
    }, new BigNumber(0));
  }

  get balanceInBtc() {
    return dealWithDigital(
      this.balanceInSatoshi.dividedBy(this.decimalFactor).toString(),
      this.limitedDecimal,
    );
  }

  get availableCurrency() {
    return this.balanceInBtc === ''
      ? '0.00'
      : (this.exchangeRate * parseFloat(this.balanceInBtc)).toFixed(2);
  }

  availableMax = () => {
    const totalFee = this.getSelectedUtxoFee(this.selectedFeeRate, true);
    const availableSatoshis = this.balanceInSatoshi.minus(totalFee);
    this.sendSatoshis = availableSatoshis;
    switch (this.sendMainUnit) {
      case BitcoinUnit.BTC:
        this.sendAmountText = satoshiToBTC(
          availableSatoshis.toNumber(),
        ).toString();
        break;
      case BitcoinUnit.Sats:
        this.sendAmountText = availableSatoshis.toString();
        break;
      case BitcoinUnit.Currency:
        this.sendAmountText = BigNumber(
          satoshiToBTC(availableSatoshis.toNumber()) * this.exchangeRate,
        ).toFixed(2);
        break;
    }
  };

  handleSendInput = (value: string) => {
    switch (this.sendMainUnit) {
      case BitcoinUnit.BTC:
        this.sendAmountText = dealWithDigital(value, 8);
        this.sendSatoshis = new BigNumber(
          btcToSatoshi(Number(dealWithDigital(value, 8))),
        );
        break;
      case BitcoinUnit.Sats:
        this.sendAmountText = dealWithDigital(value, 0);
        this.sendSatoshis = new BigNumber(this.sendAmountText);
        break;
      case BitcoinUnit.Currency:
        this.sendAmountText = dealWithDigital(value, 2);
        this.sendSatoshis = new BigNumber(
          btcToSatoshi(Number(dealWithDigital(value, 2)) / this.exchangeRate),
        );
        break;
    }
  };

  adaptBroadcastData = (signResult: {
    txId: string;
    txHex: string;
  }): BroadcastData => {
    const sendUtxoId = this.selectedResult.inputs[0].txId;
    const from = this.utxos.find(
      (utxo) => utxo.transactionHash === sendUtxoId,
    )!.address;
    return {
      txid: signResult.txId,
      hex: signResult.txHex,
      address: this.to,
      amount: this.sendSatoshis.toString(),
      fee: this.fee.toString(),
      from,
    };
  };

  validateTransaction(psbt: Psbt, utxoInputs: any[]): boolean {
    const selectedUtxoIds = utxoInputs.map((input: any) => input.txId);
    const utxoAmount = this.utxos.reduce(
      (amount: number, utxo) =>
        amount +
        (selectedUtxoIds.includes(utxo.transactionHash) ? utxo.value : 0),
      0,
    );
    return validateTx({
      psbt,
      utxoAmount,
      changeAddressPath: this.sendInfo!.changeAddressPath,
      to: this.to,
    });
  }

  send = async () => {
    if (this.sendInfo) {
      try {
        this.isSending = true;
        const psbt = generatePSBT(
          this.scriptType,
          this.sendInfo,
          this.network,
          this.selectedResult.inputs,
          this.selectedResult.outputs,
        );

        if (!this.validateTransaction(psbt, this.selectedResult.inputs)) {
          throw Error('Transaction is not valid');
        }

        const { txId, txHex } = await signPsbt(
          psbt.toBase64(),
          this.network,
          this.scriptType,
        );
        this.txId = txId;

        const coin = NETWORK_SCRIPT_TO_COIN[this.network][this.scriptType];
        const txData = this.adaptBroadcastData({ txId, txHex });
        await pushTransaction(coin, txData);

        trackTopUp({
          type: 'lightning',
          lightningType: 'internal',
          step: 'result',
          value: 'success'
        });

        this.status = 'success';
        this.isSending = false;
      } catch (e) {
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
          this.errorMessage = mapErrorToUserFriendlyError(e.message);
        }
        this.status = 'failed';
        this.isSending = false;
      }
    }
  };

  get transactionLink() {
    if (this.txId) {
      return getTransactionLink(this.txId, this.network);
    }
    return '';
  }
}

export default TopUpViewModel;
