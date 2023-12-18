import * as bitcoin from 'bitcoinjs-lib';
import BIP32Factory, { BIP32Interface } from 'bip32';
import { BitcoinNetwork } from '../../interface';
import * as ecc from "@bitcoin-js/tiny-secp256k1-asmjs";
import { toXOnly } from "bitcoinjs-lib/src/psbt/bip371";
import { BtcPsbt, AccountSigner } from '../index';
import { PsbtInputExtended } from 'bip174/src/lib/interfaces';
import { TransactionInput } from 'bitcoinjs-lib/src/psbt';
import { signAllInputsHD, tapInputHasHDKey, tapOutputHasHDKey } from '../tapSigner';

const encoder = new TextEncoder();

export function createInscriptionScript(xOnlyPublicKey: Buffer, contentType: Buffer, content: Buffer) {
  const protocolId = Buffer.from(encoder.encode("ord"));
  return [
    xOnlyPublicKey,
    bitcoin.opcodes.OP_CHECKSIG,
    bitcoin.opcodes.OP_0,
    bitcoin.opcodes.OP_IF,
    protocolId,
    1,
    1,
    contentType,
    bitcoin.opcodes.OP_0,
    content,
    bitcoin.opcodes.OP_ENDIF,
  ];
}

function createTaprootPsbt(
  rootKey: BIP32Interface,
  path: string,
  modifyInput: (txInput: PsbtInputExtended & TransactionInput) => PsbtInputExtended & TransactionInput = txInput => txInput
) {
  const childNode = rootKey.derivePath(path);
  const childNodeXOnlyPubkey = toXOnly(childNode.publicKey);

  const { output } = bitcoin.payments.p2tr({
    internalPubkey: childNodeXOnlyPubkey,
    network: bitcoin.networks.bitcoin,
  });

  const nonWitnessUtxo = new bitcoin.Transaction();
  nonWitnessUtxo.addInput(Buffer.alloc(32, 0), 0);
  nonWitnessUtxo.addOutput(output!, 1000);

  return new bitcoin.Psbt({ network: bitcoin.networks.bitcoin })
    .addInput(modifyInput({
      hash: Buffer.alloc(32, 0),
      index: 0,
      witnessUtxo: { value: 1000, script: output },
      nonWitnessUtxo: nonWitnessUtxo.toBuffer(),
      tapInternalKey: childNodeXOnlyPubkey,
      tapBip32Derivation: [
        {
          masterFingerprint: rootKey.fingerprint,
          pubkey: childNodeXOnlyPubkey,
          path,
          leafHashes: [],
        }
      ],
    }))
    .addOutput({
      value: 100,
      address: "1Fh7ajXabJBpZPZw8bjD3QU4CuQ3pRty9u",
    });
}

describe('tapSigner', () => {
  const testRootPrivateKey = "xprv9s21ZrQH143K3GJpoapnV8SFfukcVBSfeCficPSGfubmSFDxo1kuHnLisriDvSnRRuL2Qrg5ggqHKNVpxR86QEC8w35uxmGoggxtQTPvfUu";
  const rootKey = BIP32Factory(ecc).fromBase58(testRootPrivateKey);

  beforeEach(() => {
    bitcoin.initEccLib(ecc);
  })

  it('should sign taproot input', async () => {
    const path = "m/86'/0'/0'/0/0";
    const accountSigner = new AccountSigner(
      rootKey.deriveHardened(86).deriveHardened(0).deriveHardened(0),
      Buffer.from("73c5da0a", "hex"),
    );

    const psbt = createTaprootPsbt(rootKey, path);
    const psbtBase64 = psbt.toBase64();

    const btcPsbt = new BtcPsbt(psbtBase64, BitcoinNetwork.Test);
    const signedPsbtBase64 = btcPsbt.signInput(0, accountSigner);

    const signedPsbt = bitcoin.Psbt.fromBase64(signedPsbtBase64).finalizeAllInputs();
    expect(signedPsbt.extractTransaction().ins[0].witness.length).toBeGreaterThan(0);
  });

  it('should sign ordinal reveal', async () => {
    const path = "m/84'/0'/0'/0/0";
    const accountSigner = new AccountSigner(
      rootKey.deriveHardened(84).deriveHardened(0).deriveHardened(0),
      Buffer.from("73c5da0a", "hex"),
    );

    const childNode = rootKey.derivePath(path);
    const childNodeXOnlyPubkey = toXOnly(childNode.publicKey);

    const script = createInscriptionScript(
      childNodeXOnlyPubkey,
      Buffer.from(encoder.encode("text/plain;charset=utf-8")),
      Buffer.from(encoder.encode("Hello World"))
    );
    const outputScript = bitcoin.script.compile(script);

    const scriptTree = {
      output: outputScript,
      redeemVersion: 192,
    };

    const scriptTaproot = bitcoin.payments.p2tr({
      internalPubkey: childNodeXOnlyPubkey,
      scriptTree,
      redeem: scriptTree,
      network: bitcoin.networks.bitcoin,
    });

    const cblock = scriptTaproot.witness?.[scriptTaproot.witness.length - 1];

    const tapLeafScript = {
      leafVersion: scriptTaproot.redeemVersion!,
      script: outputScript,
      controlBlock: cblock,
    };

    const commitTx = new bitcoin.Transaction();

    // this is the reveal transaction
    const psbt = new bitcoin.Psbt({ network: bitcoin.networks.bitcoin })
      .addInput({
        hash: commitTx.getId(),
        index: 0,
        witnessUtxo: {
          value: 10000,
          script: scriptTaproot.output!,
        },
        nonWitnessUtxo: commitTx.toBuffer(),
        tapLeafScript: [tapLeafScript],
        tapBip32Derivation: [
          {
            masterFingerprint: rootKey.fingerprint,
            pubkey: childNodeXOnlyPubkey,
            path,
            leafHashes: [],
          }
        ],
      })
      .addOutput({
        value: 10000,
        address: "1Fh7ajXabJBpZPZw8bjD3QU4CuQ3pRty9u",
      });
    const psbtBase64 = psbt.toBase64();

    const btcPsbt = new BtcPsbt(psbtBase64, BitcoinNetwork.Test);
    const signedPsbtBase64 = btcPsbt.signInput(0, accountSigner, { disableTweakSigner: true });

    const signedPsbt = bitcoin.Psbt.fromBase64(signedPsbtBase64).finalizeAllInputs();
    expect(signedPsbt.extractTransaction().ins[0].witness.length).toBeGreaterThan(0);
  });

  it('should throw error without tapBip32Derivation', () => {
    const path = "m/86'/0'/0'/0/0";
    const accountSigner = new AccountSigner(
      rootKey.deriveHardened(86).deriveHardened(0).deriveHardened(0),
      Buffer.from("73c5da0a", "hex"),
    );

    const psbt = createTaprootPsbt(rootKey, path, input => {
      input.tapBip32Derivation = [];
      return input;
    });
    const psbtBase64 = psbt.toBase64();

    const btcPsbt = new BtcPsbt(psbtBase64, BitcoinNetwork.Test);
    expect(() => { btcPsbt.signInput(0, accountSigner) })
      .toThrowError('Need tapBip32Derivation to sign with HD');
  });

  it('should throw error with invalid tapBip32Derivation', () => {
    const path = "m/86'/0'/0'/0/0";
    const accountSigner = new AccountSigner(
      rootKey.deriveHardened(86).deriveHardened(0).deriveHardened(0),
      Buffer.from("73c5da0a", "hex"),
    );

    const psbt = createTaprootPsbt(rootKey, path, input => {
      input.tapBip32Derivation[0].masterFingerprint = Buffer.alloc(4, 0);
      return input;
    });
    const psbtBase64 = psbt.toBase64();

    const btcPsbt = new BtcPsbt(psbtBase64, BitcoinNetwork.Test);
    expect(() => { btcPsbt.signInput(0, accountSigner) })
      .toThrowError('Need one tapBip32Derivation masterFingerprint to match the HDSigner fingerprint');
  });

  it('should throw error with invalid pubkey', () => {
    const path = "m/86'/0'/0'/0/0";
    const accountSigner = new AccountSigner(
      rootKey.deriveHardened(86).deriveHardened(0).deriveHardened(0),
      Buffer.from("73c5da0a", "hex"),
    );

    const psbt = createTaprootPsbt(rootKey, path, input => {
      input.tapBip32Derivation[0].pubkey = Buffer.alloc(32, 0);
      return input;
    });
    const psbtBase64 = psbt.toBase64();

    const btcPsbt = new BtcPsbt(psbtBase64, BitcoinNetwork.Test);
    expect(() => { btcPsbt.signInput(0, accountSigner) })
      .toThrowError('pubkey did not match tapBip32Derivation');
  });

  it('should check input has taproot derivation', () => {
    const path = "m/86'/0'/0'/0/0";
    const childNode = rootKey.derivePath(path);
    const childNodeXOnlyPubkey = toXOnly(childNode.publicKey);

    expect(tapInputHasHDKey({}, rootKey)).toBe(false);
    expect(tapInputHasHDKey({
      tapBip32Derivation: [{
        masterFingerprint: rootKey.fingerprint,
        pubkey: childNodeXOnlyPubkey,
        path,
        leafHashes: [],
      }]
    }, rootKey)).toBe(true);
  });

  it('should check output has taproot derivation', () => {
    const path = "m/86'/0'/0'/0/0";
    const childNode = rootKey.derivePath(path);
    const childNodeXOnlyPubkey = toXOnly(childNode.publicKey);

    expect(tapOutputHasHDKey({}, rootKey)).toBe(false);
    expect(tapOutputHasHDKey({
      tapBip32Derivation: [{
        masterFingerprint: rootKey.fingerprint,
        pubkey: childNodeXOnlyPubkey,
        path,
        leafHashes: [],
      }]
    }, rootKey)).toBe(true);
  });

  it('should throw if options not defined for each input', () => {
    const accountSigner = new AccountSigner(
      rootKey.deriveHardened(86).deriveHardened(0).deriveHardened(0),
      Buffer.from("73c5da0a", "hex"),
    );

    const psbt = new bitcoin.Psbt({ network: bitcoin.networks.bitcoin });
    psbt.addInput({
      hash: Buffer.alloc(32, 0),
      index: 0,
    });

    expect(() => { signAllInputsHD(psbt, accountSigner, []) })
      .toThrowError('Need options for each input');
  });

  it('should fail to sign with invalid sighashTypes', () => {
    const path = "m/86'/0'/0'/0/0";
    const accountSigner = new AccountSigner(
      rootKey.deriveHardened(86).deriveHardened(0).deriveHardened(0),
      Buffer.from("73c5da0a", "hex"),
    );

    const psbt = createTaprootPsbt(rootKey, path);
    expect(() => { signAllInputsHD(psbt, accountSigner, [{ sighashTypes: [bitcoin.Transaction.SIGHASH_ALL] }]) })
      .toThrowError('No inputs were signed');
  });
});
