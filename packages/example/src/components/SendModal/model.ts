import { BigNumber } from 'bignumber.js';
import { makeAutoObservable, reaction } from 'mobx';
import { BitcoinNetwork, BitcoinScriptType, Utxo } from '../../interface';
import { generatePSBT, selectUtxos, SendInfo } from '../../lib';
import validate, { Network } from 'bitcoin-address-validation';
import { signPsbt } from '../../lib/snap';
import { getTransactionLink } from '../../lib/explorer';
import { TransactionStatus, TransactionType, TransactionDetail } from "../TransactionCard/types";
import {
  trackSendSign,
  trackTransactionBroadcast,
  trackTransactionBroadcastSucceed
} from "../../tracking";
import { FeeRate } from "./types";
import { BroadcastData, pushTransaction } from "../../api/v1/pushTransaction";
import { NETWORK_SCRIPT_TO_COIN } from "../../constant/bitcoin";
import { validateTx } from "../../lib/psbtValidator";
import { Psbt } from "bitcoinjs-lib";
import { satoshiToBTC, btcToSatoshi } from "../../lib/helper"

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

const bitcoinUnit = {
  [BitcoinNetwork.Main] : {
    BTC: "BTC",
    Sats: "sats",
    USD: "USD"
  },
  [BitcoinNetwork.Test] : {
    BTC: "tBTC",
    Sats: "tsats",
    USD: "USD"
  }
}

class SendViewModel {
  public to: string = '';
  private sendAmountText = '';
  private decimal = 8;
  private decimalFactor = new BigNumber(10).pow(this.decimal);
  private limitedDecimal = 8;
  public selectedFeeRate: keyof FeeRate = 'recommended';
  private currencyAmount: string = '0.00';

  private sendMainUnit = this.unit;
  private sendSecondaryUnit = bitcoinUnit[this.network].USD;
  private sendSatoshi = new BigNumber(0);

  public status: 'initial' | 'success' | 'failed' = 'initial';

  public errorMessage = '';

  public confirmOpen = false;

  private txId?: string;

  public isSending = false;

  constructor(
    private utxos: Utxo[],
    public feeRate: FeeRate,
    private exchangeRate: number,
    public network: BitcoinNetwork,
    public unit: string,
    private scriptType: BitcoinScriptType,
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
    this.confirmOpen = false;
    this.txId = undefined;
    this.errorMessage = '';
    this.isSending = false;
    this.to = '';
    this.sendAmountText = '';
    this.sendSatoshi = new BigNumber(0);
    this.sendSecondaryUnit = bitcoinUnit[this.network].USD;
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

  setNetwork = (network: BitcoinNetwork) => {
    this.network = network;
  }

  setTo = (to: string) => {
    this.to = to;
  };

  setUnits = (unit: string) => {
    this.unit = unit;
  };

  get sendAmountMain() {
    return this.sendAmountText;
  }

  get sendAmountSecondary() {
    switch (this.sendSecondaryUnit) {
      case bitcoinUnit[this.network].BTC:
        return new BigNumber(satoshiToBTC(this.sendSatoshi.toNumber())).toFixed();
      case bitcoinUnit[this.network].Sats:
        return this.sendSatoshi.isNaN() ? '0.00' :this.sendSatoshi.toNumber();
      case bitcoinUnit[this.network].USD:
        return this.sendSatoshi.isNaN() ? '0.00' : new BigNumber(satoshiToBTC(this.sendSatoshi.toNumber() * this.exchangeRate)).toFixed(2);
    }
  }

  get currentUnit(){
    return bitcoinUnit[this.network];
  }

  get sendAmountTextNum() {
    // -----Todo: set max balance -----
    return parseFloat(this.sendAmountText)
  }

  get mainUnits() {
    return this.sendMainUnit;
  }

  get secondaryUnits() {
    return this.sendSecondaryUnit
  }

  switchUnits = () => {
    const unitEqual = (this.sendMainUnit === this.unit);
    this.sendMainUnit = unitEqual ? bitcoinUnit[this.network].USD : this.unit;
    this.sendSecondaryUnit = unitEqual ? this.unit : bitcoinUnit[this.network].USD;
    this.sendAmountText = '';
    this.sendSatoshi = new BigNumber(0);
  }

  get formattedTo() {
    if (this.to.length > 12) {
      let head = this.to.slice(0, 6);
      let tail = this.to.slice(this.to.length - 6);
      return `${head}...${tail}`;
    }
    return this.to;
  }

  get sendSatoshis() {
    const { BTC, Sats, USD } = this.currentUnit;
    switch(this.unit){
      case BTC:
        return new BigNumber(this.sendAmountText).multipliedBy(this.decimalFactor)
      case Sats:
        return new BigNumber(satoshiToBTC(parseFloat(this.sendAmountText)).toString()).multipliedBy(this.decimalFactor)
      case USD:
        return new BigNumber((parseFloat(this.sendAmountText)/this.exchangeRate).toString()).multipliedBy(this.decimalFactor);
      default:
        return new BigNumber(this.sendAmountText).multipliedBy(this.decimalFactor);
    }
  }

  setFeeRate = (feeRate: FeeRate) => (this.feeRate = feeRate);

  setSelectedFeeRate = (feeRate: keyof FeeRate) => {
    this.selectedFeeRate = feeRate;
  }

  get selectedResult() {
    if (this.sendSatoshis.gt(0)) {
      return selectUtxos(
        this.to,
        this.sendSatoshis.toNumber(),
        this.feeRate[this.selectedFeeRate],
        this.utxos,
        this.network,
        this.scriptType,
        this.sendInfo?.addressList || []
      );
    }
    return {};
  }

  get fee() {
    // -----Todo: switch fee -----
    if (
      this.selectedResult.inputs &&
      this.selectedResult.outputs &&
      this.selectedResult.fee
    )
      return this.selectedResult.fee;
    return 0;
  }

  get feeText() {
    const { BTC, Sats, USD } = this.currentUnit;
    switch(this.sendMainUnit) {
      case BTC:
        return dealWithDigital(new BigNumber(this.fee).dividedBy(this.decimalFactor).toString(), 8);
      case Sats:
        return this.fee.toString();
      case USD:
        return new BigNumber(satoshiToBTC(this.fee) * this.exchangeRate).toFixed(2);
    }
  }

  get amountLength() {
    return this.sendAmountText?.length || 1;
  }

  get amountText() {
    return this.sendAmountText;
  }

  get totalAmount() {
    if(this.unit === bitcoinUnit[this.network].BTC) {
      return this.sendSatoshi.plus(this.fee).dividedBy(this.decimalFactor).toString()
    } else {
      return this.sendSatoshi.toString();
    }
  }

  get totalCurrency() {
    return (satoshiToBTC(this.sendSatoshi.plus(this.fee).toNumber()) * this.exchangeRate).toFixed(2)
  }

  get isEmptyAmount() {
    return this.sendAmountText === ''
  }

  get amountValid() {
    if (this.isEmptyAmount) return true;
    return this.availableSatoshi.gte(this.sendSatoshi.plus(this.fee));
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

  get availableCurrency() {
    return this.availableBtc === '' ? '0.00' : ((this.exchangeRate * parseFloat(this.availableBtc)).toFixed(2))
  }

  availableMaxBtc = () => {
    const { BTC, Sats, USD } = this.currentUnit;
    switch(this.unit){
      case BTC:
        this.sendAmountText = this.availableBtc
        break;
      case Sats:
        this.sendAmountText = btcToSatoshi(parseFloat(this.availableBtc)).toString()
        break;
      case USD:
        this.sendAmountText = (parseFloat(this.availableBtc) * this.exchangeRate).toString();
        break;
    }
  }

  get sentTx(): TransactionDetail {
    return {
      ID: this.txId as string,
      type: TransactionType.SEND,
      status: TransactionStatus.PENDING,
      date: new Date().getTime(),
      address: this.to,
      amount: Number(this.sendAmountText)
    }
  }

  handleSendInput = (value: string) => {
    const { BTC, Sats, USD } = this.currentUnit;
    switch (this.sendMainUnit) {
      case BTC:
        this.sendAmountText = dealWithDigital(value, 8);
        this.sendSatoshi = new BigNumber(btcToSatoshi(Number(dealWithDigital(value, 8))));
        break;
      case Sats:
        this.sendAmountText = dealWithDigital(value, 0);
        this.sendSatoshi = new BigNumber(this.sendAmountText);
        break;
      case USD:
        this.sendAmountText = dealWithDigital(value, 2);
        this.sendSatoshi = new BigNumber(btcToSatoshi((Number(dealWithDigital(value, 2)) / this.exchangeRate)));
        break;
    }
  };

  adaptBroadcastData = (signResult: { txId: string, txHex: string }): BroadcastData => {
    const sendUtxoId = this.selectedResult.inputs[0].txId;
    const from = this.utxos.find(utxo => utxo.transactionHash === sendUtxoId)!.address
    return {
      txid: signResult.txId,
      hex: signResult.txHex,
      address: this.to,
      amount: this.sendSatoshis.toString(),
      fee: this.fee.toString(),
      from
    }
  }

  validateTransaction(psbt: Psbt, utxoInputs: any[]): boolean {
    const selectedUtxoIds = utxoInputs.map((input: any) => input.txId);
    const utxoAmount = this.utxos.reduce((amount: number, utxo) =>
      amount + (selectedUtxoIds.includes(utxo.transactionHash) ? utxo.value : 0)
    , 0);
    return validateTx({
      psbt,
      utxoAmount,
      changeAddressPath: this.sendInfo!.changeAddressPath,
      to: this.to
    })
  }

  send = async () => {
    if (this.sendInfo) {
      try {
        this.isSending = true;
        const psbt = generatePSBT(
          this.feeRate[this.selectedFeeRate],
          this.sendInfo,
          this.network,
          this.selectedResult.inputs,
          this.selectedResult.outputs,
        );

        if(!this.validateTransaction(psbt, this.selectedResult.inputs)){
          throw Error("Transaction is not valid")
        }

        const { txId, txHex } = await signPsbt(psbt.toBase64(), this.network, this.scriptType);
        this.txId = txId;
        trackSendSign(this.network)

        trackTransactionBroadcast(this.network);
        const coin = NETWORK_SCRIPT_TO_COIN[this.network][this.scriptType];
        const txData = this.adaptBroadcastData({txId, txHex});
        await pushTransaction(coin, txData);
        trackTransactionBroadcastSucceed(this.network);

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
      return getTransactionLink(this.txId, this.network);
    }
    return "";
  }
}

export default SendViewModel;
