import { BigNumber } from 'bignumber.js';
import { makeAutoObservable, reaction } from 'mobx';
import { BitcoinNetwork, Utxo } from '../../interface';
import { genreatePSBT, selectUtxos, SendInfo, sendTx } from '../../lib';
import validate, { Network } from 'bitcoin-address-validation';
import { signPsbt } from '../../lib/snap';
import { BlockChair } from '../../lib/explorer';
import { TransactionStatus, TransactionType, TransactionDetail } from "../TransactionCard/types";

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
  public to: string = '';
  private sendAmountText = '';
  private decimal = 8;
  private decimalFactor = new BigNumber(10).pow(this.decimal);
  private limitedDecimal = 4;

  public status: 'initial' | 'success' | 'failed' = 'initial';

  public errorMessage = '';

  public sendOpen = false;

  public confirmOpen = false;

  private txId?: string;

  public isSending = false;

  constructor(
    private utxos: Utxo[],
    private feeRate: number,
    private network: BitcoinNetwork,
    private sendInfo?: SendInfo,
  ) {
    makeAutoObservable(this);
    reaction(
      () => this.status,
      status => {
        if (status !== 'initial') this.setConfirmOpen(false);
      },
    );
  }

  resetState = () => {
    this.status = 'initial';
    this.sendOpen = false;
    this.confirmOpen = false;
    this.txId = undefined;
    this.errorMessage = '';
    this.isSending = false;
    this.to = '';
    this.sendAmountText = '';
  };

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

  get formattedTo() {
    if (this.to.length > 12) {
      let head = this.to.slice(0, 6);
      let tail = this.to.slice(this.to.length - 6);
      return `${head}...${tail}`;
    }
    return this.to;
  }

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

  get unit () {
    return this.network === BitcoinNetwork.Main ? "BTC" : "TBTC";
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
    return this.sendAmountText === '' || this.sendAmountText.match(/0\.?0*$/);
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

  get sentTx(): TransactionDetail {
    return {
      ID: this.txId as string,
      type: TransactionType.SEND,
      status: TransactionStatus.PENDING,
      date: new Date().getTime(),
      address: this.to,
      amount: this.sendAmountText
    }
  }

  handleSendInput = (btcValue: string) => {
    this.sendAmountText = dealWithDigital(btcValue, this.limitedDecimal);
  };

  send = async () => {
    if (this.sendInfo) {
      try {
        this.isSending = true;
        const psbt = genreatePSBT(
          this.feeRate,
          this.sendInfo,
          this.network,
          this.selectedResult.inputs,
          this.selectedResult.outputs,
        );
        const { txId, txHex } = await signPsbt(psbt.toBase64(), this.network);
        this.txId = txId;
        await sendTx(txHex, this.network);
        this.status = 'success';
        this.isSending = false;
      } catch (e) {
        console.error(e);
        if (typeof e === 'string') {
          this.errorMessage = e;
        } else if (e instanceof Error) {
          this.errorMessage = e.message;
        }
        this.status = 'failed';
        this.isSending = false;
      }
    }
  };

  get transactionLink() {
    if (this.txId) {
      return BlockChair.getTransactionLink(this.txId, this.network);
    }
    return undefined;
  }
}

export default SendViewModel;
