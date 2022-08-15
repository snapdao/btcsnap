import { BigNumber } from 'bignumber.js';
import { makeAutoObservable, reaction } from 'mobx';
import { BitcoinNetwork, Utxo } from '../../interface';
import { genreatePSBT2, selectUtxos, SendInfo } from '../../lib';
import validate, { Network } from 'bitcoin-address-validation';
import { signPsbt } from '../../lib/snap';

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

class SendViewModel {
  public to: string;
  private sendAmountText = '';
  private decimal = 8;
  private decimalFactor = new BigNumber(10).pow(this.decimal);
  private limitedDecimal = 4;

  public status: 'initial' | 'success' | 'failed' = 'initial';

  public sendOpen = false;

  public confirmOpen = false;

  constructor(
    private utxos: Utxo[],
    private feeRate: number,
    private network: BitcoinNetwork,
    private sendInfo?: SendInfo,
  ) {
    makeAutoObservable(this);
    this.to = '';
    reaction(
      () => this.status,
      status => {
        if (status !== 'initial') this.setConfirmOpen(false);
      },
    );
  }

  setSendOpen = (flag: boolean) => {
    this.sendOpen = flag;
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

  setTo = (to: string) => {
    this.to = to;
  };

  get sendSatoshis() {
    return new BigNumber(this.sendAmountText).multipliedBy(this.decimalFactor);
  }

  setFeeRate = (feeRate: number) => (this.feeRate = feeRate);

  get selectedResult() {
    if (this.sendSatoshis.gt(0)) {
      return selectUtxos(
        this.to,
        this.sendSatoshis.toNumber(),
        this.feeRate,
        this.utxos,
      );
    }
    return {};
  }

  get fee() {
    if (
      this.selectedResult.inputs &&
      this.selectedResult.outputs &&
      this.selectedResult.fee
    )
      return this.selectedResult.fee;
    return new BigNumber(0);
  }

  get feeText() {
    return dealWithDigital(
      new BigNumber(this.fee).dividedBy(this.decimalFactor).toString(),
      8,
    );
  }

  get amountLength() {
    return this.sendAmountText?.length || 1;
  }

  get amountText() {
    return this.sendAmountText;
  }

  get totalAmount() {
    return this.sendSatoshis
      .plus(this.fee)
      .dividedBy(this.decimalFactor)
      .toString();
  }

  get isEmptyAmount() {
    return this.sendAmountText === '';
  }

  get amountValid() {
    if (this.isEmptyAmount) return true;
    return this.availableSatoshi.gte(this.sendSatoshis.plus(this.fee));
  }

  get isEmptyTo() {
    return this.to === '';
  }

  get toValid() {
    if (this.isEmptyTo) return true;
    const network =
      this.network === BitcoinNetwork.Main ? Network.mainnet : Network.testnet;
    return validate(this.to, network);
  }

  get valid() {
    return (
      this.amountValid && this.toValid && !this.isEmptyAmount && !this.isEmptyTo
    );
  }

  get availableSatoshi() {
    return this.utxos.reduce((acc, cur) => {
      return acc.plus(cur.value);
    }, new BigNumber(0));
  }

  get availableBtc() {
    return dealWithDigital(
      this.availableSatoshi.dividedBy(this.decimalFactor).toString(),
      this.limitedDecimal,
    );
  }

  handleSendInput = (btcValue: string) => {
    this.sendAmountText = dealWithDigital(btcValue, this.limitedDecimal);
  };

  send = async () => {
    if (this.sendInfo) {
      console.log(this.selectedResult);
      try {
        const psbt = genreatePSBT2(
          this.feeRate,
          this.sendInfo,
          this.network,
          this.selectedResult.inputs,
          this.selectedResult.outputs,
        );
        const { txId, txHex } = await signPsbt(psbt.toBase64(), this.network);
        console.log(txHex);
        // await sendTx(txHex, this.net);
        this.status = 'success';
      } catch (e) {
        console.error(e);
        this.status = 'failed';
      }
    }
  };
}

export default SendViewModel;
