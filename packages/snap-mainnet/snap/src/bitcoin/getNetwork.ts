import { Network, networks } from 'bitcoinjs-lib';
import { BitcoinNetwork } from '../interface';

export function getNetwork(network: BitcoinNetwork): Network {
  switch (network) {
    case BitcoinNetwork.Main:
      return networks.bitcoin;
    case BitcoinNetwork.Test:
      return networks.testnet;
    default:
      throw Error('Network net exist');
  }
}
