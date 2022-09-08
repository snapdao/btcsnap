import * as bitcoin from "bitcoinjs-lib";
import { networks } from "bitcoinjs-lib";
import { detectNetworkAndScriptType, networkAndScriptMap } from "../../lib";
import * as bip32 from "bip32";
import { BitcoinNetwork, BitcoinScriptType } from "../../interface";

export class Bitcoin {
  public deriveAddress(publicKey: Buffer, scriptType: BitcoinScriptType, network: BitcoinNetwork): string {
    const networkConfig = this.getNetworkConfig(network);
    let address: string | undefined = "";
    switch (scriptType) {
      case BitcoinScriptType.P2PKH:
        address = bitcoin.payments.p2pkh({ pubkey: publicKey, network: networkConfig }).address;
        break;
      case BitcoinScriptType.P2SH_P2WPKH:
        address = bitcoin.payments.p2sh({
          redeem: bitcoin.payments.p2wpkh({ pubkey: publicKey, network: networkConfig }),
          network: networkConfig,
        }).address;
        break;
      case BitcoinScriptType.P2WPKH:
        address = bitcoin.payments.p2wpkh({ pubkey: publicKey, network: networkConfig }).address
        break;
      default:
        address = ""
    }
    if (address) {
      return address;
    } else {
      throw new Error('generate address failed');
    }
  }

  public xpubToPubkey(xpub: string, change: number, index: number) {
    const { pubKey, network } = this.convertPubKeyFormat(xpub)
    const node = bip32.fromBase58(pubKey, network)
    return node.derive(change).derive(index).publicKey;
  }

  private convertPubKeyFormat(extendedPubKey: string){
    const { network, config } = detectNetworkAndScriptType(extendedPubKey);
    const networkConfig = this.getNetworkConfig(network);
    const targetPrefix = network === BitcoinNetwork.Main ? "xpub" : "tpub";
    return {
      pubKey: this.transferNode(extendedPubKey, targetPrefix, config),
      network: networkConfig
    };
  }
  
  private getNetworkConfig(network: BitcoinNetwork) {
    let networkConfig = networks.bitcoin
    if(network === BitcoinNetwork.Test) {
      networkConfig = networks.testnet
    }
    return networkConfig
  }

  private transferNode(
    extendedPubKey: string,
    prefix: string,
    config: { private: number; public: number },
  ){
    const node = bip32.fromBase58(extendedPubKey, { bip32: config, wif: 0 });
    let mainConfig = networkAndScriptMap[prefix]['config'];
    const transferNode = bip32.fromPublicKey(node.publicKey, node.chainCode, {
      bip32: mainConfig,
      wif: 0,
    });
    return transferNode.toBase58();
  }
}
