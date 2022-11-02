import * as bip32 from 'bip32';
import { networks, Psbt } from 'bitcoinjs-lib';
import { PsbtValidator } from '../PsbtValidator';
import { AccountSigner } from '../index';
import { BitcoinNetwork } from '../../interface';
import { psbtFixture } from './fixtures/psbt';

const getAccountSigner = () => {
  const testPrivateAccountKey = "tprv8gwYx7tEWpLxdJhEa7R8ofchqzRgme6iiuyJpegZ71XNhnAqeMjT6GV4wm3jqsUjXgXj99GB4kDminso5kxnLa6VXt3WVRzfmhbDSrfbCDv";
  const accountNode = bip32.fromBase58(testPrivateAccountKey, networks.testnet);
  return new AccountSigner(accountNode, Buffer.from("f812d139", 'hex'));
}

describe('psbtValidator', () => {
  const signer = getAccountSigner();
  let psbt: Psbt;

  beforeEach(() => {
    psbt = new Psbt({ network: networks.testnet })
    psbt.addInput({
      hash: psbtFixture.tx.inputs[0].hash,
      index: psbtFixture.tx.inputs[0].index,
      witnessUtxo: psbtFixture.data.inputs[0].witnessUtxo,
    })
    psbt.addOutputs(psbtFixture.tx.outputs);
  })

  it('should throw error when not all inputs have nonWitnessUtxo', () => {
    const psbtValidator = new PsbtValidator(psbt, BitcoinNetwork.Test);
    expect(() => {psbtValidator.validate(signer)}).toThrowError('Not all inputs have prev Tx raw hex');
  });

  it('should throw error when not all inputs matches network', () => {
    psbt.updateInput(0,{
      nonWitnessUtxo: psbtFixture.data.inputs[0].nonWitnessUtxo,
      bip32Derivation: psbtFixture.data.inputs[0].bip32Derivation,
    })

    const psbtValidator = new PsbtValidator(psbt, BitcoinNetwork.Main);
    expect(() => {psbtValidator.validate(signer)}).toThrowError('Not every input matches network');
  });

  it('should throw error when not all outputs matches network', () => {
    psbt.updateInput(0,{
      nonWitnessUtxo: psbtFixture.data.inputs[0].nonWitnessUtxo,
      bip32Derivation: psbtFixture.data.inputs[0].bip32Derivation,
    })
    psbt.addOutput({
      script: Buffer.from('0014198d799580d87fb6c0341b1e9619a20ef47cd5f8', 'hex'),
      value: 10000,
      bip32Derivation: [{
        masterFingerprint: Buffer.from('f812d139', 'hex'),
        pubkey: Buffer.from('0278e1319c1c09991e1450dc53bfc271047c1f13d8f27791679216ea01e5a7a7fb', 'hex'),
        path: `m/84'/0'/0'/1/1`,
      }],
    })

    const psbtValidator = new PsbtValidator(psbt, BitcoinNetwork.Test);
    expect(() => {psbtValidator.validate(signer)}).toThrowError('Not every output matches network');
  });

  it('should throw error when not all inputs belong to current account', () => {
    psbt.updateInput(0,{
      nonWitnessUtxo: psbtFixture.data.inputs[0].nonWitnessUtxo,
      bip32Derivation: [{
        masterFingerprint: Buffer.from('d1f83912', 'hex'),
        pubkey: Buffer.from('02925681a7268f4c3a673070e8aba405fbc2dda03455a9e48e33b00d88bb22ed21', 'hex'),
        path: `m/84'/1'/0'/1/0`,
      }],
    })

    const psbtValidator = new PsbtValidator(psbt, BitcoinNetwork.Test);
    expect(() => {psbtValidator.validate(signer)}).toThrowError('Not all inputs belongs to current account');
  });

  it('should throw error when not all change addresses belong to current account', () => {
    psbt.updateInput(0,{
      nonWitnessUtxo: psbtFixture.data.inputs[0].nonWitnessUtxo,
      bip32Derivation: psbtFixture.data.inputs[0].bip32Derivation,
    })
    psbt.updateOutput(1, {
      bip32Derivation: [{
        masterFingerprint: Buffer.from('d1f83912', 'hex'),
        pubkey: Buffer.from('02925681a7268f4c3a673070e8aba405fbc2dda03455a9e48e33b00d88bb22ed21', 'hex'),
        path: `m/84'/1'/0'/1/0`,
      }],
    })

    const psbtValidator = new PsbtValidator(psbt, BitcoinNetwork.Test);
    expect(() => {psbtValidator.validate(signer)}).toThrowError(`Change address doesn't belongs to current account`);
  });

  it('should throw error when fee is too high', () => {
    const psbt = new Psbt({ network: networks.testnet })
    psbt.addInput({
      hash: psbtFixture.tx.inputs[0].hash,
      index: psbtFixture.tx.inputs[0].index,
      bip32Derivation: psbtFixture.data.inputs[0].bip32Derivation,
      nonWitnessUtxo: Buffer.from('020000000001021bccdce05ccbb65dc1dbbbf54ae93bf6698929dd606ed0f8a33519e3caf875790100000000ffffffff02fa42640f5e366dd37617057d906dec56f9eb6f0d1a5e50913e733ec3e5aadd0000000000ffffffff0100E1F50500000000160014bc0a67512c383155d858dd99a967f78420161aca02483045022100f9ac6f847e1b167da64b1a3ac73c9b62dac08dda46d18ce5a816a6d1435a137902200d2583deea1878b4aca0bb8564179cc4a759b682208ea71a91c4af3a6848734c012103481e8f9077010011be6b251eccc7da40dd22ebe0cee03c31b45fa76ee596a7e202473044022018827ad600e0a20f9e6466c052897fd434c9c3b2685c1732a7a3fe93d673fdda02203edcf366e07416374cae4a735a40d9bab60947b3017119eccd582aca35f9c44b01210311f4fa4d09f0394f309ab322a126ca75bdebebf74eced8aaeedb86894bf874f100000000', 'hex'),
      witnessUtxo: {
        script: Buffer.from('0014bc0a67512c383155d858dd99a967f78420161aca', 'hex'),
        value: 10000000,
      },
    })
    psbt.addOutputs(psbtFixture.tx.outputs);

    const psbtValidator = new PsbtValidator(psbt, BitcoinNetwork.Test);
    expect(() => {psbtValidator.validate(signer)}).toThrowError('Too much fee');
  });

  it('should throw error given witnessUtxo value not equals to nonWitnessUtxo value', () => {
    const psbt = new Psbt({ network: networks.testnet })
    psbt.addInput({
      hash: psbtFixture.tx.inputs[0].hash,
      index: psbtFixture.tx.inputs[0].index,
      nonWitnessUtxo: psbtFixture.data.inputs[0].nonWitnessUtxo,
      bip32Derivation: psbtFixture.data.inputs[0].bip32Derivation,
      witnessUtxo: {
        script: Buffer.from('0014bc0a67512c383155d858dd99a967f78420161aca', 'hex'),
        value: 10000000,
      },
    })
    psbt.addOutputs(psbtFixture.tx.outputs);

    const psbtValidator = new PsbtValidator(psbt, BitcoinNetwork.Test);
    expect(() => {psbtValidator.validate(signer)}).toThrowError('Transaction input amount not match');
  });

  it('should return true given a valid psbt', function() {
    const psbt = Psbt.fromBase64(psbtFixture.base64, { network: networks.testnet})
    const psbtValidator = new PsbtValidator(psbt, BitcoinNetwork.Test);

    expect(psbtValidator.validate(signer)).toBe(true);
  });
});
