import { address, Network, Psbt, Transaction } from 'bitcoinjs-lib';
import { getNetwork } from './getNetwork';
import { BitcoinNetwork } from '../interface';

export class PsbtHelper {
  private tx: Psbt;
  private network: Network;

  constructor(psbt: Psbt, network: BitcoinNetwork) {
    this.network = getNetwork(network);
    this.tx = psbt;
  }

  get inputAmount() {
    return this.tx.data.inputs.reduce((total, input, index) => {
      const vout = this.tx.txInputs[index].index;
      const prevTx = Transaction.fromHex(input.nonWitnessUtxo.toString('hex'));
      return total + prevTx.outs[vout].value;
    }, 0);
  }

  get sendAmount() {
    return this.tx.txOutputs
      .filter(output => !this.changeAddresses.includes(output.address))
      .reduce((amount, output) => amount + output.value, 0);
  }

  get fee() {
    const outputAmount = this.tx.txOutputs.reduce((amount, output) => amount + output.value, 0);
    return this.inputAmount - outputAmount;
  }

  get fromAddresses() {
    return this.tx.data.inputs.map((input, index) => {
      const prevOuts = Transaction.fromHex(input.nonWitnessUtxo.toString('hex')).outs
      const vout = this.tx.txInputs[index].index;
      return address.fromOutputScript(prevOuts[vout].script, this.network)
    })
  }

  get toAddresses() {
    return this.tx.txOutputs.map(output => output.address).filter(address => !this.changeAddresses.includes(address));
  }

  get changeAddresses() {
    return this.tx.data.outputs
      .map((output, index) => output.bip32Derivation ? this.tx.txOutputs[index].address : undefined)
      .filter(address => !!address)
  }
}
