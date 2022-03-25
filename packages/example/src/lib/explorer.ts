import * as bip32 from 'bip32';
import { BIP32Interface } from 'bip32';
import { BitcoinNetwork, BitcoinScriptType, Utxo } from '../interface';
import { deteckNetworkAndScriptType, networkAndScriptMap } from './index';

export interface Exloper {
  /**
   * Fetch Uxto List from the outside serivce like an bitcoin exploer, the unconfirmed utxo should not be included
   * if includHex is set to true, the utxo item will include its raw transaction hex
   * @param addresses
   * @param includeHex
   */
  getStatus(
    xpub: string,
    includeHex: boolean,
  ): Promise<{ utxos: Utxo[]; recieveMax: number; changeMax: number }>;

  /**
   * Fetch the raw transaction hex by the transaction hash
   * @param transactionHash
   */
  getTransaction(transactionHash: string): Promise<string>;

  /**
   * get the suggested fee rate
   * returns the fee rate
   */
  getSuggestFeeRate(): Promise<number>;
}

type BlockChairResponse = {
  data: {
    [xpub: string]: {
      addresses: {
        [address: string]: {
          path: string;
        };
      };
      utxo: BlockChairUxto[];
    };
  };
};

type BlockChairUxto = {
  block_id: number;
  transaction_hash: string;
  index: number;
  value: number;
  address: string;
};

export class BlockChair implements Exloper {
  private apiKey: string;
  private host: string;
  private network: BitcoinNetwork;
  constructor(apiKey: string, network: BitcoinNetwork) {
    this.apiKey = apiKey;
    this.host = 'https://api.blockchair.com';
    this.network = network;
  }

  private genereateHost() {
    return this.network === BitcoinNetwork.Test
      ? `${this.host}/bitcoin/testnet`
      : `${this.host}/bitcoin`;
  }

  private extractUtxo(response: BlockChairResponse) {
    return Object.values(response.data)[0]['utxo'].map((each) => ({
      address: each.address,
      transactionHash: each.transaction_hash,
      index: each.index,
      value: each.value,
    }));
  }

  private processAddressStatus(response: BlockChairResponse) {
    const allPaths = Object.values(
      Object.values(response.data)[0]['addresses'],
    ).map((each) => each.path);
    let recieveMax = 0;
    let changeMax = 0;
    allPaths.forEach((each) => {
      let [type, indexNumber] = each.split('/').map((path) => parseInt(path));
      if (type === 0 && indexNumber > recieveMax) {
        recieveMax = indexNumber;
      } else if (type === 1 && indexNumber > changeMax) {
        changeMax = indexNumber;
      }
    });

    return [recieveMax, changeMax];
  }

  private transferNode(
    extendedPubKey: string,
    prefix: string,
    config: { private: number; public: number },
  ) {
    const node = bip32.fromBase58(extendedPubKey, { bip32: config, wif: 0 });
    let mainConfig = networkAndScriptMap[prefix]['config'];
    const transferNode = bip32.fromPublicKey(node.publicKey, node.chainCode, {
      bip32: mainConfig,
      wif: 0,
    });
    return transferNode.toBase58();
  }

  public convertPubKeyFormate(extendedPubKey: string) {
    const { network, scriptType, config } =
      deteckNetworkAndScriptType(extendedPubKey);
    if (network === BitcoinNetwork.Test) {
      if (scriptType === BitcoinScriptType.P2PKH) {
        return this.transferNode(extendedPubKey, 'xpub', config);
      } else if (scriptType === BitcoinScriptType.P2SH) {
        return this.transferNode(extendedPubKey, 'ypub', config);
      } else {
        return this.transferNode(extendedPubKey, 'zpub', config);
      }
    } else {
      return extendedPubKey;
    }
  }

  async getStatus(extendedPubKey: string, includeHex: boolean = false) {
    const convertedPubKey = this.convertPubKeyFormate(extendedPubKey);

    const host = `${this.genereateHost()}/dashboards/xpub/${convertedPubKey}`;
    const url = new URL(host);
    const params = { limit: '5000', state: 'latest', key: this.apiKey };
    url.search = new URLSearchParams(params).toString();
    const resp = await fetch(url.toString());
    if (!resp.ok) {
      // process error logic for 404 return []
      if (resp.status === 404) {
        return { utxos: [], recieveMax: 0, changeMax: 0 };
      } else {
        throw new Error('fetch utxo data error');
      }
    }

    const responseJson = await resp.json();
    const [recieveMax, changeMax] = this.processAddressStatus(responseJson);
    const utxoList = this.extractUtxo(responseJson);
    if (includeHex) {
      const utxoListWithHex = [];
      for (let each of utxoList) {
        const rawHex = await this.getTransaction(each.transactionHash);
        utxoListWithHex.push({ ...each, rawHex });
      }
      return { utxos: utxoListWithHex, recieveMax, changeMax };
    }
    return { utxos: utxoList, recieveMax, changeMax };
  }

  async getTransaction(transactionHash: string): Promise<string> {
    const host = `${this.genereateHost()}/raw/transaction/${transactionHash}`;
    const url = new URL(host);
    const resp = await fetch(url.toString());

    if (!resp.ok) {
      if (resp.status === 404) {
        throw new Error('tx not found');
      } else {
        throw new Error('fetch tx data error');
      }
    }

    const responseJson = await resp.json();
    return responseJson['data'][transactionHash]['raw_transaction'];
  }

  async getSuggestFeeRate(): Promise<number> {
    const host = `${this.genereateHost()}/stats`;
    const url = new URL(host);
    const resp = await fetch(url.toString());

    if (!resp.ok) {
      throw new Error('fetch bitcoin transaction data error');
    }

    const responseJson = await resp.json();
    return responseJson['data']['suggested_transaction_fee_per_byte_sat'];
  }
}
