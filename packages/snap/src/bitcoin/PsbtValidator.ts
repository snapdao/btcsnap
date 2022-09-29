import { Psbt } from 'bitcoinjs-lib';
import { AccountSigner } from './index';
import { BitcoinNetwork } from '../interface';
import { PsbtHelper } from '../bitcoin/PsbtHelper';

const BITCOIN_MAIN_NET_ADDRESS_PATTERN = /^(1|3|bc1)/;
const BITCOIN_TEST_NET_ADDRESS_PATTERN = /^(m|n|2|tb1)/;

export class PsbtValidator {
  static FEE_THRESHOLD = 10000000;
  private readonly tx: Psbt;
  private readonly snapNetwork: BitcoinNetwork;
  private psbtHelper: PsbtHelper;
  private error = '';

  constructor(psbt: Psbt, network: BitcoinNetwork) {
    this.tx = psbt;
    this.snapNetwork = network;
    this.psbtHelper = new PsbtHelper(this.tx, network);
  }

  allInputsHaveRawTxHex() {
    const result = this.tx.data.inputs.every((input, index) => !!input.nonWitnessUtxo);
    if (!result) {
      this.error = 'Not all inputs have prev Tx raw hex';
    }
    return result;
  }

  everyInputMatchesNetwork() {
    const addressPattern = this.snapNetwork === BitcoinNetwork.Main ? BITCOIN_MAIN_NET_ADDRESS_PATTERN : BITCOIN_TEST_NET_ADDRESS_PATTERN;
    const result = this.psbtHelper.fromAddresses.every(address => addressPattern.test(address))
    if (!result) {
      this.error = 'Not every input matches network';
    }
    return result;
  }

  everyOutputMatchesNetwork() {
    const addressPattern = this.snapNetwork === BitcoinNetwork.Main ? BITCOIN_MAIN_NET_ADDRESS_PATTERN : BITCOIN_TEST_NET_ADDRESS_PATTERN;
    const result = this.tx.txOutputs.every((output) => addressPattern.test(output.address));

    if (!result) {
      this.error = 'Not every output matches network';
    }
    return result;
  }

  allInputsBelongToCurrentAccount(accountSigner: AccountSigner) {
    const result = this.tx.txInputs.every((_, index) =>
      this.tx.inputHasHDKey(index, accountSigner),
    );
    if (!result) {
      this.error = 'Not all inputs belongs to current account';
    }
    return result;
  }

  changeAddressBelongsToCurrentAccount(accountSigner: AccountSigner) {
    const result = this.tx.data.outputs.every((output, index) => {
      if (output.bip32Derivation) {
        return this.tx.outputHasHDKey(index, accountSigner);
      }
      return true;
    });
    if (!result) {
      this.error = 'Change address doesn\'t belongs to current account';
    }
    return result;
  }

  feeUnderThreshold() {
    const result = this.psbtHelper.fee < PsbtValidator.FEE_THRESHOLD;
    if (!result) {
      this.error = 'Too much fee';
    }
    return result;
  }

  witnessUtxoValueMatchesNoneWitnessOnes() {
    const hasWitnessUtxo = this.tx.data.inputs.some((_, index) => this.tx.getInputType(index) === "witnesspubkeyhash");
    if (!hasWitnessUtxo) {
      return true;
    }

    const witnessAmount = this.tx.data.inputs.reduce((total, input, index) => {
      return total + input.witnessUtxo.value;
    }, 0);
    const result = this.psbtHelper.inputAmount === witnessAmount;

    if (!result) {
      this.error = 'Transaction input amount not match';
    }
    return result;
  }

  validate(accountSigner: AccountSigner) {
    this.error = '';

    this.allInputsHaveRawTxHex() &&
    this.everyInputMatchesNetwork() &&
    this.everyOutputMatchesNetwork() &&
    this.allInputsBelongToCurrentAccount(accountSigner) &&
    this.changeAddressBelongsToCurrentAccount(accountSigner) &&
    this.feeUnderThreshold() &&
    this.witnessUtxoValueMatchesNoneWitnessOnes();

    if (this.error) {
      throw Error(this.error);
    }
    return true;
  }
}
