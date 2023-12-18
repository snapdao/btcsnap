import { Psbt, networks } from 'bitcoinjs-lib';
import * as bitcoin from 'bitcoinjs-lib';
import { BtcPsbt, AccountSigner } from '../index';
import BIP32Factory from 'bip32';
import { BitcoinNetwork } from '../../interface';
import { psbtFixture } from './fixtures/psbt';
import * as ecc from "@bitcoin-js/tiny-secp256k1-asmjs";
import { toXOnly } from 'bitcoinjs-lib/src/psbt/bip371';

// only for testing
// hybrid betray symbol aim promote vehicle extend west slice silver man belt
const testPrivateAccountKey = 'tprv8gwYx7tEWpLxdJhEa7R8ofchqzRgme6iiuyJpegZ71XNhnAqeMjT6GV4wm3jqsUjXgXj99GB4kDminso5kxnLa6VXt3WVRzfmhbDSrfbCDv';

function getAccountSigner() {
  const accountNode = BIP32Factory(ecc).fromBase58(testPrivateAccountKey, networks.testnet);
  return new AccountSigner(accountNode, Buffer.from("f812d139", 'hex'));
}

describe('bitcoin', () => {
  const signer = getAccountSigner();
  let psbt: Psbt;

  beforeEach(() => {
    psbt = new Psbt({ network: networks.testnet })
    psbt.addInput({
      ...psbtFixture.tx.inputs[0],
      ...psbtFixture.data.inputs[0],
    })
    psbt.addOutputs(psbtFixture.tx.outputs);
  })

  describe('AccountSigner', () => {
    it('should generate account signer', () => {
      const node = BIP32Factory(ecc).fromBase58(testPrivateAccountKey, networks.testnet);
      const signer = new AccountSigner(
        node,
        Buffer.from('f812d139', 'hex'),
      );
      const childSigner = signer.derivePath(psbtFixture.data.inputs[0].bip32Derivation[0].path);
      expect(childSigner.fingerprint.toString('hex')).toBe('f812d139');
    });

    it('should raise error if the path is not right', () => {
      const node = BIP32Factory(ecc).fromBase58(testPrivateAccountKey, networks.testnet);
      const signer = new AccountSigner(node);
      expect(() => signer.derivePath('m/0\'/-1')).toThrow('invalid path');
    });

    it('should able to sign', () => {
      const node = BIP32Factory(ecc).fromBase58(testPrivateAccountKey, networks.testnet);
      const signer = new AccountSigner(node);
      const testBuffer = Buffer.from(
        '936a185caaa266bb9cbe981e9e05cb78cd732b0b3280eb944412bb6f8f8f07af',
        'hex',
      );
      const signature = signer.sign(testBuffer);
      expect(signature.toString('hex')).toBe(
        '33b5f9376c8c084c01627825f3ab2f52857085df7692fc0a1f10e7d464475b7e62e328634bb52498670b85c147276401a6b896fa88d44c984332be4c951caa8c',
      );
    });

    it('should tweak node', () => {
      const node = BIP32Factory(ecc).fromBase58(testPrivateAccountKey, networks.testnet);
      const signer = new AccountSigner(node);

      const childNode = signer.derivePath("m/86'/0'/0'/0/0");
      const childNodeXOnlyPubkey = toXOnly(childNode.publicKey);

      expect(signer.tweak(childNodeXOnlyPubkey).publicKey.toString('hex')).toBe(
        '0340b35b2ddebe0afb6af04291383e9793acd111787a8dfef44fb4d0776629cf19',
      );
    });
  });

  describe('BtcPsbt', () => {
    it('should be able to construct the tx and extract the psbt json', () => {
      const tx = new BtcPsbt(psbtFixture.base64, BitcoinNetwork.Test);

      const testJson = tx.extractPsbtJson();

      expect(testJson.from).toBe('tb1qhs9xw5fv8qc4tkzcmkv6jelhssspvxk2wmtd0v',);
      expect(testJson.to).toBe('tb1qqkelutyrqmxgzd9nnfws2yk3dl600yvxagfqu7',);
      expect(testJson.value).toBe("200000 tsats");
      expect(testJson.fee).toBe("7458 tsats");
      expect(testJson.network).toBe('testnet');
    });

    it('should be able to extract PSBT info as JSON string', () => {
      const tx = new BtcPsbt(psbtFixture.base64, BitcoinNetwork.Test);
      expect(tx.extractPsbtJsonString()).toBe(`
from: tb1qhs9xw5fv8qc4tkzcmkv6jelhssspvxk2wmtd0v
to: tb1qqkelutyrqmxgzd9nnfws2yk3dl600yvxagfqu7
value: 200000 tsats
fee: 7458 tsats
network: testnet
changeAddress: tb1qx5wzl3f27d6dgzk9u7h47pqdts60xdpax4w5rf
`.trim() + '\n');
    });

    it('should be able to validate the psbt', () => {
      const signer = getAccountSigner();

      const tx = new BtcPsbt(psbtFixture.base64, BitcoinNetwork.Test);
      expect(tx.validatePsbt(signer)).toBe(true);
    });

    it('should be able to sign transaction and extract txId and txHex', () => {
      const tx = new BtcPsbt(psbtFixture.base64, BitcoinNetwork.Test);
      const { txId, txHex } = tx.signPsbt(signer);
      expect(txId).toBe(
        '4db856b1b7049cce26dc298458796f66d0dee39a5d0651b4c51aa0c66326adec',
      );
      expect(txHex).toBe(
        '020000000001012a4fa3e26d8dbf1c7bcf220e051ef4c74197f374457ccec93b7a6d8445e0ac600000000000ffffffff02400d03000000000016001405b3fe2c8306cc8134b39a5d0512d16ff4f791869acd0b0000000000160014351c2fc52af374d40ac5e7af5f040d5c34f3343d02483045022100cb9909386da8eeda5c505b904a41f3a539d03e9c3af2d2030a6c6bcd3125884802203b922ab5815342501c58dec34317c8a7f02dddccabebbd3deb814dbccb8b4809012103481e8f9077010011be6b251eccc7da40dd22ebe0cee03c31b45fa76ee596a7e200000000',
      );
    });

    it('should be able to sign taproot transaction and extract txId and txHex', () => {
      bitcoin.initEccLib(ecc);

      const path = "m/86'/0'/0'/0/0";
      const childNode = signer.derivePath(path);
      const childNodeXOnlyPubkey = toXOnly(childNode.publicKey);

      const { output } = bitcoin.payments.p2tr({
        internalPubkey: childNodeXOnlyPubkey,
        network: bitcoin.networks.bitcoin,
      });

      const nonWitnessUtxo = new bitcoin.Transaction();
      nonWitnessUtxo.addInput(Buffer.alloc(32, 0), 0);
      nonWitnessUtxo.addOutput(output!, 1000);

      const psbtBase64 = new bitcoin.Psbt({ network: networks.testnet })
        .addInput({
          hash: Buffer.alloc(32, 0),
          index: 0,
          witnessUtxo: { value: 1000, script: output },
          nonWitnessUtxo: nonWitnessUtxo.toBuffer(),
          tapInternalKey: childNodeXOnlyPubkey,
          tapBip32Derivation: [
            {
              masterFingerprint: signer.fingerprint,
              pubkey: childNodeXOnlyPubkey,
              path,
              leafHashes: [],
            }
          ],
        })
        .addOutput({
          value: 100,
          address: "tb1qx6xg96cgg3nelhthv7du7xfn2t2hsgqrvdg7mj",
        })
        .toBase64();

      const tx = new BtcPsbt(psbtBase64, BitcoinNetwork.Test);
      const { txId, txHex } = tx.signPsbt(signer);
      expect(txId).toBe(
        'e0a70feca465add48d89fade7c66b68589fc95f21c8e69e3121a4bd6cee3302d',
      );
      expect(txHex).toBe(
        '0200000000010100000000000000000000000000000000000000000000000000000000000000000000000000ffffffff016400000000000000160014368c82eb0844679fdd77679bcf193352d57820030140dec9eb88adab2689a69d3e8e32f409c6ed7bb6d7916d1bb780603fd4483849e2dacc27ea1a89c221e66944a84cad617d2489bbb5d69726bfdf3b3390a2a4db4900000000',
      );
    });
  });
});
