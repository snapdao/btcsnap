import * as bitcoin from 'bitcoinjs-lib';
import BIP32Factory from 'bip32';
import { BitcoinNetwork, ScriptType } from '../../interface';
import { signInput } from '..';
import { SnapMock } from '../__mocks__/snap';
import { extractAccountPrivateKey } from '../getExtendedPublicKey';
import * as ecc from "@bitcoin-js/tiny-secp256k1-asmjs";
import { toXOnly } from "bitcoinjs-lib/src/psbt/bip371";
import { RequestErrors } from '../../errors';

jest.mock('../../rpc/getExtendedPublicKey');

const mockSignInput = jest.fn();
jest.mock("../../bitcoin", () => {
  return {
    BtcPsbt: jest.fn().mockImplementation(() => {
      return {
        validatePsbt: () => true,
        extractPsbtJson: jest.fn().mockReturnValue({
          from: "mx5m68zHiGnFEoMjTdkWinmBAYsWyp9DJk",
          to: "mx5m68zHiGnFEoMjTdkWinmBAYsWyp9DJk",
          value: 9500,
          fee: 500,
          network: "test"
        }),
        signInput: mockSignInput
      };
    }),
    AccountSigner: jest.fn()
  };
})

describe('signInput', () => {
  const snapStub = new SnapMock();
  const domain = "www.justsnap.io"
  const testRootPrivateKey = "xprv9s21ZrQH143K3GJpoapnV8SFfukcVBSfeCficPSGfubmSFDxo1kuHnLisriDvSnRRuL2Qrg5ggqHKNVpxR86QEC8w35uxmGoggxtQTPvfUu";
  let testPsbtBase64: string;

  beforeAll(() => {
    (extractAccountPrivateKey as jest.Mock).mockResolvedValue({
      node: BIP32Factory(ecc).fromBase58(testRootPrivateKey).deriveHardened(86).deriveHardened(0).deriveHardened(0),
      mfp: "73c5da0a"
    });

    bitcoin.initEccLib(ecc);

    const rootKey = BIP32Factory(ecc).fromBase58(testRootPrivateKey);
    const path = "m/86'/0'/0'/0/0";
    const childNode = rootKey.derivePath(path);
    const childNodeXOnlyPubkey = toXOnly(childNode.publicKey);
    const { output } = bitcoin.payments.p2tr({
      internalPubkey: childNodeXOnlyPubkey,
      network: bitcoin.networks.bitcoin,
    });

    const nonWitnessUtxo = new bitcoin.Transaction();
    nonWitnessUtxo.addInput(Buffer.alloc(32, 0), 0);
    nonWitnessUtxo.addOutput(output!, 1000);

    const psbt = new bitcoin.Psbt({ network: bitcoin.networks.bitcoin })
      .addInput({
        hash: Buffer.alloc(32, 0),
        index: 0,
        witnessUtxo: { value: 1000, script: output },
        nonWitnessUtxo: nonWitnessUtxo.toBuffer(),
        tapInternalKey: childNodeXOnlyPubkey,
        tapBip32Derivation: [
          {
            masterFingerprint: rootKey.fingerprint,
            pubkey: Buffer.alloc(32, 0),
            path,
            leafHashes: [],
          }
        ],
      })
      .addOutput({
        value: 100,
        address: "1Fh7ajXabJBpZPZw8bjD3QU4CuQ3pRty9u",
      });
    testPsbtBase64 = psbt.toBase64();
  });

  afterEach(() => {
    snapStub.reset()
  });

  it('should sign taproot input if user approved', async () => {
    snapStub.rpcStubs.snap_dialog.mockResolvedValue(true);
    snapStub.rpcStubs.snap_manageState.mockResolvedValue({ network: BitcoinNetwork.Main });

    await signInput(domain, snapStub, testPsbtBase64, BitcoinNetwork.Main, ScriptType.P2TR, 0);
    await expect(mockSignInput).toHaveBeenCalled();
  });

  it('should reject if user does not sign the input', async () => {
    snapStub.rpcStubs.snap_dialog.mockResolvedValue(false);

    await expect(signInput(domain, snapStub, testPsbtBase64, BitcoinNetwork.Main, ScriptType.P2TR, 0))
      .rejects
      .toThrowError('User reject the sign request');
    expect(snapStub.rpcStubs.snap_getBip32Entropy).not.toHaveBeenCalled();
  });

  it('should reject if network is wrong', async () => {
    await expect(signInput(domain, snapStub, testPsbtBase64, BitcoinNetwork.Test, ScriptType.P2TR, 0))
      .rejects
      .toThrowError(RequestErrors.NetworkNotMatch.message);
    expect(snapStub.rpcStubs.snap_getBip32Entropy).not.toHaveBeenCalled();
  });
});
