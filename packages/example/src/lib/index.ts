import * as bitcoin from 'bitcoinjs-lib';
import { networks, payments, Psbt, crypto } from 'bitcoinjs-lib';
import { BitcoinNetwork, BitcoinScriptType, Utxo } from '../interface';
import coinSelect from 'coinselect';
import coinSelectSplit from 'coinselect/split';

type networkAndScriptType = {
  [key: string]: {
    network: BitcoinNetwork;
    scriptType: BitcoinScriptType;
    config: { private: number; public: number };
  };
};

export const networkAndScriptMap: networkAndScriptType = {
  xpub: {
    network: BitcoinNetwork.Main,
    scriptType: BitcoinScriptType.P2PKH,
    config: { private: 0x0488ade4, public: 0x0488b21e },
  },
  xprv: {
    network: BitcoinNetwork.Main,
    scriptType: BitcoinScriptType.P2PKH,
    config: { private: 0x0488ade4, public: 0x0488b21e },
  },
  ypub: {
    network: BitcoinNetwork.Main,
    scriptType: BitcoinScriptType.P2SH_P2WPKH,
    config: { private: 0x049d7878, public: 0x049d7cb2 },
  },
  yprv: {
    network: BitcoinNetwork.Main,
    scriptType: BitcoinScriptType.P2SH_P2WPKH,
    config: { private: 0x049d7878, public: 0x049d7cb2 },
  },
  zpub: {
    network: BitcoinNetwork.Main,
    scriptType: BitcoinScriptType.P2WPKH,
    config: { private: 0x04b2430c, public: 0x04b24746 },
  },
  zprv: {
    network: BitcoinNetwork.Main,
    scriptType: BitcoinScriptType.P2WPKH,
    config: { private: 0x04b2430c, public: 0x04b24746 },
  },
  tpub: {
    network: BitcoinNetwork.Test,
    scriptType: BitcoinScriptType.P2PKH,
    config: { private: 0x04358394, public: 0x043587cf },
  },
  tprv: {
    network: BitcoinNetwork.Test,
    scriptType: BitcoinScriptType.P2PKH,
    config: { private: 0x04358394, public: 0x043587cf },
  },
  upub: {
    network: BitcoinNetwork.Test,
    scriptType: BitcoinScriptType.P2SH_P2WPKH,
    config: { private: 0x044a4e28, public: 0x044a5262 },
  },
  uprv: {
    network: BitcoinNetwork.Test,
    scriptType: BitcoinScriptType.P2SH_P2WPKH,
    config: { private: 0x044a4e28, public: 0x044a5262 },
  },
  vpub: {
    network: BitcoinNetwork.Test,
    scriptType: BitcoinScriptType.P2WPKH,
    config: { private: 0x045f18bc, public: 0x045f1cf6 },
  },
  vprv: {
    network: BitcoinNetwork.Test,
    scriptType: BitcoinScriptType.P2WPKH,
    config: { private: 0x045f18bc, public: 0x045f1cf6 },
  },
};

export const detectNetworkAndScriptType = (extendedPubKey: string) => {
  const keyPrefix = Object.keys(networkAndScriptMap).find(
    (each) => extendedPubKey.slice(0, 4) === each,
  );

  if (keyPrefix) {
    return networkAndScriptMap[keyPrefix];
  }
  throw new Error('Unknown network or script Type');
};

export type SendInfo = {
  masterFingerprint: Buffer;
  changeAddress: string | undefined;
  changeAddressPath: string;
  changeAddressPubkey: Buffer;
  receiveAddress?: string;
};

export const generatePSBT = (
  scriptType: BitcoinScriptType,
  sendInfo: SendInfo,
  network: BitcoinNetwork,
  inputs: any[],
  outputs: any[],
) => {
  if (!sendInfo.changeAddress) {
    throw new Error('change address is empty');
  }

  return composePsbt(
    inputs,
    outputs,
    sendInfo.changeAddress,
    sendInfo.changeAddressPath,
    sendInfo.changeAddressPubkey,
    sendInfo.masterFingerprint,
    network,
    scriptType,
  );
};

export const selectUtxos = (
  target: string,
  value: number,
  feeRate: number,
  utxos: Utxo[],
  countAvailable = false,
) => {
  const targetObj = [
    {
      address: target,
      value: value,
    },
  ];
  const utxoList = utxos.map((each) => {
    const formattedUxto: Record<string, any> = {
      txId: each.transactionHash,
      vout: each.index,
      value: each.value,
      address: each.address,
      pubkey: each.pubkey,
      rawHex: each.rawHex,
      path: each.path,
    };
    return formattedUxto;
  });

  const coinSelectFn = countAvailable ? coinSelectSplit : coinSelect;
  return coinSelectFn(utxoList, targetObj, feeRate);
};

const composePsbt = (
  inputs: any[],
  outputs: any[],
  changeAddress: string,
  changeAddressPath: string,
  changeAddressPubkey: Buffer,
  masterFingerprint: Buffer,
  network: BitcoinNetwork,
  scriptType: BitcoinScriptType,
) => {

  let networkConfig: any;
  if (network === BitcoinNetwork.Main) {
    networkConfig = networks.bitcoin;
  } else {
    networkConfig = networks.testnet;
  }

  const psbt = new Psbt({ network: networkConfig });

  if (!inputs) throw new Error('No suitable UTXOs available for constructing the transaction');

  inputs.forEach((each) => {
    const commonFields = {
      hash: each.txId,
      index: each.vout,
      nonWitnessUtxo: Buffer.from(each.rawHex, 'hex'),
      bip32Derivation: [
        {
          masterFingerprint,
          path: each.path,
          pubkey: each.pubkey,
        },
      ],
    };

    if (scriptType === BitcoinScriptType.P2PKH && each.rawHex) {
      psbt.addInput({
        ...commonFields,
      });
    } else if (scriptType === BitcoinScriptType.P2WPKH) {
      psbt.addInput({
        ...commonFields,
        witnessUtxo: {
          script: payments.p2wpkh({
            pubkey: each.pubkey,
            network: networkConfig,
          }).output as Buffer,
          value: each.value,
        },
      });
    } else if (scriptType === BitcoinScriptType.P2SH_P2WPKH) {
      psbt.addInput({
        ...commonFields,
        witnessUtxo: {
          script: calculateScript(each.pubkey, each),
          value: each.value,
        },
        redeemScript: bitcoin.payments.p2wpkh({
          pubkey: each.pubkey,
          network: networkConfig,
        }).output,
      });
    } else {
      throw new Error('script Type not matched');
    }
  });

  outputs.forEach((output) => {
    if (output.address) {
      psbt.addOutput({
        address: output.address,
        value: output.value,
      });
    } else {
      psbt.addOutput({
        address: changeAddress,
        value: output.value,
        bip32Derivation: [
          {
            masterFingerprint,
            path: changeAddressPath,
            pubkey: changeAddressPubkey,
          },
        ],
      });
    }
  });

  return psbt;
};

const calculateScript = (publicKey: Buffer, network: bitcoin.Network) => {
  const p2wpkh = payments.p2wpkh({
    pubkey: publicKey,
    network,
  });

  const p2sh = payments.p2sh({
    redeem: p2wpkh,
    network: network,
  }) as any;

  const script = compileScript(p2sh.redeem.output);

  return script;
};

const compileScript = (script: Buffer) => {
  return bitcoin.script.compile([
    bitcoin.script.OPS.OP_HASH160,
    crypto.hash160(script),
    bitcoin.script.OPS.OP_EQUAL,
  ]);
};
