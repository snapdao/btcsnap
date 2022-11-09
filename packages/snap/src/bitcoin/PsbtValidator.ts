import { Psbt } from 'bitcoinjs-lib';
import { AccountSigner } from './index';
import { BitcoinNetwork } from '../interface';
import { PsbtHelper } from '../bitcoin/PsbtHelper';
import { fromHdPathToObj } from './cryptoPath';
import { PsbtValidateErrors, SnapError } from "../errors";

const BITCOIN_MAINNET_COIN_TYPE = 0;
const BITCOIN_TESTNET_COIN_TYPE = 1;
const BITCOIN_MAIN_NET_ADDRESS_PATTERN = /^(1|3|bc1)/;
const BITCOIN_TEST_NET_ADDRESS_PATTERN = /^(m|n|2|tb1)/;

export class PsbtValidator {
  static FEE_THRESHOLD = 10000000;
  private readonly tx: Psbt;
  private readonly snapNetwork: BitcoinNetwork;
  private psbtHelper: PsbtHelper;
  private error: SnapError | null = null;

  constructor(psbt: Psbt, network: BitcoinNetwork) {
    this.tx = psbt;
    this.snapNetwork = network;
    this.psbtHelper = new PsbtHelper(this.tx, network);
  }

  get coinType(){
    return this.snapNetwork === BitcoinNetwork.Main ? BITCOIN_MAINNET_COIN_TYPE: BITCOIN_TESTNET_COIN_TYPE;
  }

  allInputsHaveRawTxHex() {
    const result = this.tx.data.inputs.every((input, index) => !!input.nonWitnessUtxo);
    if (!result) {
      this.error = SnapError.of(PsbtValidateErrors.InputsDataInsufficient);
    }
    return result;
  }

  everyInputMatchesNetwork() {
    const result = this.tx.data.inputs.every(input =>
      input.bip32Derivation.every(derivation => {
        const {coinType} = fromHdPathToObj(derivation.path)
        return Number(coinType) === this.coinType
      })
    )
    if (!result) {
      this.error = SnapError.of(PsbtValidateErrors.InputsNetworkNotMatch);
    }
    return result;
  }

  everyOutputMatchesNetwork() {
    const addressPattern = this.snapNetwork === BitcoinNetwork.Main ? BITCOIN_MAIN_NET_ADDRESS_PATTERN : BITCOIN_TEST_NET_ADDRESS_PATTERN;
    const result = this.tx.data.outputs.every((output, index) => {
     if(output.bip32Derivation){
       return output.bip32Derivation.every(derivation => {
         const {coinType} = fromHdPathToObj(derivation.path)
         return Number(coinType) === this.coinType
       })
     } else {
       const address = this.tx.txOutputs[index].address;
       return addressPattern.test(address);
     }
    })

    if (!result) {
      this.error = SnapError.of(PsbtValidateErrors.OutputsNetworkNotMatch);
    }
    return result;
  }

  allInputsBelongToCurrentAccount(accountSigner: AccountSigner) {
    const result = this.tx.txInputs.every((_, index) =>
      this.tx.inputHasHDKey(index, accountSigner),
    );
    if (!result) {
      this.error = SnapError.of(PsbtValidateErrors.InputNotSpendable);
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
      this.error = SnapError.of(PsbtValidateErrors.ChangeAddressInvalid);
    }
    return result;
  }

  feeUnderThreshold() {
    const result = this.psbtHelper.fee < PsbtValidator.FEE_THRESHOLD;
    if (!result) {
      this.error = SnapError.of(PsbtValidateErrors.FeeTooHigh);
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
      this.error = SnapError.of(PsbtValidateErrors.AmountNotMatch);
    }
    return result;
  }

  validate(accountSigner: AccountSigner) {
    this.error = null;

    this.allInputsHaveRawTxHex() &&
    this.everyInputMatchesNetwork() &&
    this.everyOutputMatchesNetwork() &&
    this.allInputsBelongToCurrentAccount(accountSigner) &&
    this.changeAddressBelongsToCurrentAccount(accountSigner) &&
    this.feeUnderThreshold() &&
    this.witnessUtxoValueMatchesNoneWitnessOnes();

    if (this.error) {
      throw this.error
    }
    return true;
  }
}
