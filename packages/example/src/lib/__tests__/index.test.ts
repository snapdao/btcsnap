import { detectNetworkAndScriptType, generatePSBT, selectUtxos } from '../index';
import { BitcoinNetwork, BitcoinScriptType } from '../../interface';
import { p2wpkhSendInfo, p2shSendInfo, p2pkhSendInfo, p2pkhSelectInfo } from './fixtures/sendInfo';
import coinSelect from 'coinselect';

jest.mock('coinselect');

// hybrid betray symbol aim promote vehicle extend west slice silver man belt

describe('index', () => {
  describe('detectNetworkAndScriptType', () => {
    it('should return mainnet and P2PKH given xpub', () => {
      const extendedPubKey = 'xpub6CAcsYkoMZb2mdMzHoi37RBd6LeTnqhkWKhsBezXmCXhgs6UxiN3w6KcG1WP171JWjrudVQHmAW73n2T6vSGPt5jmDq4wVkZbB4sSZrt9Je';
      const result = detectNetworkAndScriptType(extendedPubKey);
      expect(result).toMatchObject({ 'network': 'mainnet', 'scriptType': 'P2PKH' });
    });

    it('should return testnet and P2SH-P2WPKH give upub', () => {
      const extendedPubKey = 'upub5EDhnYucnpRfUVPcsEySqULrj1d2xzGT2ttuVdxe3ZuVb715wndB2bT1kAnK1vChVsb6oFguJn5poLbE5n1FfULCEibaChMxzWEXTh4iEmn';
      const result = detectNetworkAndScriptType(extendedPubKey);
      expect(result).toMatchObject({ 'network': 'testnet', 'scriptType': 'P2SH-P2WPKH' });
    });

    it('should return testnet and P2WPKH given vpub', () => {
      const extendedPubKey = 'vpub5ZbRxxkxeYzDYP9wLrXPaykSjxZ54LoZvMwMBpswRMp7gn8ShDNptC7pqTggcC4BQQ9cDx1RCqwKmLkUeniiDBR9mcxxFnvSSwubiqAdG8P';
      const result = detectNetworkAndScriptType(extendedPubKey);
      expect(result).toMatchObject({ 'network': 'testnet', 'scriptType': 'P2WPKH' });
    });
  });

  describe('generatePSBT', () => {
    it('should throw error when change address is empty', () => {

      const scriptType = BitcoinScriptType.P2WPKH;
      const sendInfo = {
        masterFingerprint: Buffer.from('', 'hex'),
        changeAddress: undefined,
        changeAddressPath: 'M/84\'/1\'/0\'/1/12',
        changeAddressPubkey: Buffer.from('', 'hex'),
      };
      const network = BitcoinNetwork.Test;

      expect(() => generatePSBT(scriptType, sendInfo, network, [], [])).toThrowError('change address is empty');
    });

    it('should add input and output for psbt given send info of P2WPKH', () => {
      const { scriptType, sendInfo, network, inputs, outputs } = p2wpkhSendInfo;
      const psbt = generatePSBT(scriptType, sendInfo, network, inputs, outputs);

      expect(psbt.txInputs[0]).toMatchObject({
        hash: Buffer.from('456f5c07624a0d8640bfc2f7e1dc5a1be4f225849a85a95c5cd3a595ff9d3e5a', 'hex'),
        index: inputs[0].vout,
      });

      expect(psbt.data.inputs[0]).toMatchObject({
        nonWitnessUtxo: Buffer.from(inputs[0].rawHex, 'hex'),
        bip32Derivation: [
          {
            masterFingerprint: sendInfo.masterFingerprint,
            path: inputs[0].path,
            pubkey: inputs[0].pubkey,
          },
        ],
        witnessUtxo: {
          script: Buffer.from('0014a47c080add5955a172dfa3b006d78f5f9c182f95', 'hex'),
          value: 10000,
        },
      });

      expect(psbt.txOutputs[0]).toMatchObject({
        address: outputs[0].address,
        value: outputs[0].value,
      });
    });

    it('should add input and output for psbt given send info of P2SH-P2WPKH', () => {
      const { scriptType, sendInfo, network, inputs, outputs } = p2shSendInfo;
      const psbt = generatePSBT(scriptType, sendInfo, network, inputs, outputs);

      expect(psbt.txInputs[0]).toMatchObject({
        hash: Buffer.from('18b71bb5bfa0d9b2cf5a8779c23f6eb4a98f330a64224bd26a3e0a7184527a39', 'hex'),
        index: inputs[0].vout,
      });

      expect(psbt.data.inputs[0]).toMatchObject({
        nonWitnessUtxo: Buffer.from(inputs[0].rawHex, 'hex'),
        bip32Derivation: [
          {
            masterFingerprint: sendInfo.masterFingerprint,
            path: inputs[0].path,
            pubkey: inputs[0].pubkey,
          },
        ],
        witnessUtxo: {
          script: Buffer.from('a9146b6a9d040b8ec006bb5eef53d607d97e99e2d45b87', 'hex'),
          value: inputs[0].value,
        },
        redeemScript: Buffer.from('0014818555ba586f035a9912bf5ab2c49e9110a4b91a', 'hex'),
      });

      expect(psbt.txOutputs[0]).toMatchObject({
        address: outputs[0].address,
        value: outputs[0].value,
      });

      expect(psbt.txOutputs[1]).toMatchObject({
        address: sendInfo.changeAddress,
        value: outputs[1].value,
      });

      expect(psbt.data.outputs[1]).toMatchObject({
        bip32Derivation: [
          {
            masterFingerprint: sendInfo.masterFingerprint,
            path: sendInfo.changeAddressPath,
            pubkey: sendInfo.changeAddressPubkey,
          },
        ],
      });

    });

    it('should add input and output for psbt given send info of P2PKH', () => {
      const { scriptType, sendInfo, network, inputs, outputs } = p2pkhSendInfo;
      const psbt = generatePSBT(scriptType, sendInfo, network, inputs, outputs);

      expect(psbt.txInputs[0]).toMatchObject({
        hash: Buffer.from('0e4b099a6abf2adb8114f767ed876441b7ee821c9f867616c18e2ff04a4c3712', 'hex'),
        index: inputs[0].vout,
      });

      expect(psbt.data.inputs[0]).toMatchObject({
        nonWitnessUtxo: Buffer.from(inputs[0].rawHex, 'hex'),
        bip32Derivation: [
          {
            masterFingerprint: sendInfo.masterFingerprint,
            path: inputs[0].path,
            pubkey: inputs[0].pubkey,
          },
        ]
      });

      expect(psbt.txOutputs[0]).toMatchObject({
        address: outputs[0].address,
        value: outputs[0].value,
      });

      expect(psbt.txOutputs[1]).toMatchObject({
        address: sendInfo.changeAddress,
        value: outputs[1].value,
      });

      expect(psbt.data.outputs[1]).toMatchObject({
        bip32Derivation: [
          {
            masterFingerprint: sendInfo.masterFingerprint,
            path: sendInfo.changeAddressPath,
            pubkey: sendInfo.changeAddressPubkey,
          }
        ]
      });
    });
  });

  describe('selectUtxos', () => {
    it('should call coinSelect with right param', () => {
      const { inputs } = p2pkhSelectInfo;
      const target = 'tb1qzx5s7fkvuwl2d2z246aemv4knjvuh2yhygncy7';
      const value = 20000;
      const feeRate = 32;
      selectUtxos(target, value, feeRate, inputs);

      const formattedUxto = {
        txId: inputs[0].transactionHash,
        vout: inputs[0].index,
        value: inputs[0].value,
        address: inputs[0].address,
        pubkey: inputs[0].pubkey,
        rawHex: inputs[0].rawHex,
        path: inputs[0].path,
      };

      expect(coinSelect).toBeCalledWith([formattedUxto], [{
        address: 'tb1qzx5s7fkvuwl2d2z246aemv4knjvuh2yhygncy7',
        value: 20000,
      }], 32);
    });
  });
});
