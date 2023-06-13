import { Network, networks } from 'bitcoinjs-lib';
import { BitcoinNetwork } from '../interface';

export function getNetwork(network: BitcoinNetwork): Network {
  switch (network) {
    case BitcoinNetwork.Main:
      return networks.bitcoin;
    default:
      throw Error('Network net exist');
  }
}
