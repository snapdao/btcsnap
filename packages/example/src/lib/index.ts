import { networks, payments, Psbt, PsbtTxInput } from 'bitcoinjs-lib';
import { Address, BitcoinNetwork, BitcoinScriptType, Utxo } from '../interface';
import coinSelect from 'coinselect';

interface Bip32Derivation {
  masterFingerprint: Buffer;
  pubkey: Buffer;
  path: string;
}

interface PsbtInput extends PsbtTxInput {
  nonWitnessUtxo?: Buffer;
  bip32Derivation?: Bip32Derivation[];
  witnessUtxo?: Buffer;
  redeemScript?: Buffer
}

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

const DUST_THRESHOLD = 546;

export type SendInfo = {
  addressList: Address[];
  masterFingerprint: Buffer;
  changeAddress: string | undefined;
}

export const generatePSBT = (
  feeRate: number,
  sendInfo: {
    addressList: Address[];
    masterFingerprint: Buffer;
    changeAddress: string | undefined;
  },
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
    sendInfo.addressList,
    sendInfo.masterFingerprint,
    network,
  );
};


export const selectUtxos = (
  target: string,
  value: number,
  feeRate: number,
  utxos: Utxo[],
  network: BitcoinNetwork,
  scriptType: BitcoinScriptType,
  addressList: Address[]
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
    };

    const networkConfig = network === BitcoinNetwork.Main ? networks.bitcoin : networks.testnet;
    if (each.rawHex) {
      formattedUxto['nonWitnessUtxo'] = Buffer.from(each.rawHex, 'hex');
    } else if (target) {
      const pubkey = findAddress(each.address, addressList)?.pubkey!;
      const p2wpkh = payments.p2wpkh({pubkey, network: networkConfig});

      if (scriptType === BitcoinScriptType.P2WPKH) {
        formattedUxto['witnessUtxo'] = {
          script: p2wpkh.output,
          value: each.value
        };
      }
      if (scriptType === BitcoinScriptType.P2SH_P2WPKH) {
        const p2sh = payments.p2sh({redeem: p2wpkh, network: networkConfig});
        formattedUxto["redeemScript"] = p2wpkh.output;
        formattedUxto["witnessUtxo"] = {
          script: p2sh.output,
          value: each.value
        }
      }
    }
    return formattedUxto;
  });

  return coinSelect(utxoList, targetObj, feeRate);
};

const findAddress = (address: string, addressList: Address[]) => {
  return addressList.find((each) => each.address === address);
};

const composePsbt = (
  inputs: any[],
  outputs: any[],
  changeAddress: string,
  addressList: Address[],
  masterFingerprint: Buffer,
  network: BitcoinNetwork,
) => {
  let networkConfig;
  if (network === BitcoinNetwork.Main) {
    networkConfig = networks.bitcoin;
  } else {
    networkConfig = networks.testnet;
  }

  let psbt = new Psbt({ network: networkConfig });

  if(!inputs) throw new Error('Utxo selections error please retry')

  inputs.forEach((each) => {
    let inputItem: PsbtInput = {
      hash: each.txId,
      index: each.vout,
    };

    if (each.nonWitnessUtxo) {
      inputItem['nonWitnessUtxo'] = Buffer.from(each.nonWitnessUtxo, 'hex');
    } else if (each.witnessUtxo) {
      inputItem['witnessUtxo'] = each.witnessUtxo;
    }
    if(each.redeemScript) {
      inputItem['redeemScript'] = each.redeemScript;
    }

    const addressItem = findAddress(each.address, addressList);
    if (addressItem) {
      inputItem['bip32Derivation'] = [
        {
          masterFingerprint,
          path: addressItem.path,
          pubkey: addressItem.pubkey,
        },
      ];
    }
    psbt.addInput(inputItem as any);
  });

  outputs.forEach((output) => {
    if (!output.address) {
      output.address = changeAddress;
    }

    psbt.addOutput({
      address: output.address,
      value: output.value,
    });
  });

  return psbt;
};

