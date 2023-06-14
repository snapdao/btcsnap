import { Network, networks } from 'bitcoinjs-lib';
import { BitcoinNetwork } from '../interface';

export const getSnapType = () => {
  return BitcoinNetwork.Main;
}

export const getNetwork = (): Network => {
  const network = getSnapType();
  switch (network) {
    case BitcoinNetwork.Main:
      return networks.bitcoin;
    case BitcoinNetwork.Test:
      return networks.testnet;
    default:
      throw Error('Network net exist');
  }
}

export const getNetworkFromCoinType = (coinType?: number | string): Network => {
  return getNetwork();
}

export const getSnapTypeFromNetwork = (network?: Network): BitcoinNetwork => {
  return getSnapType();
}

export const getNetworkFromSnapType = (snapType?: BitcoinNetwork): Network => {
  return getNetwork();
}

export const getCoinType = () => {
  return getCoinTypeFromSnapType(getSnapType());
}

export const getCoinTypeFromSnapType = (snapType?: BitcoinNetwork) => {
  const BITCOIN_MAINNET_COIN_TYPE = 0;
  const BITCOIN_TESTNET_COIN_TYPE = 1;
  return getSnapType() === BitcoinNetwork.Main ? BITCOIN_MAINNET_COIN_TYPE: BITCOIN_TESTNET_COIN_TYPE;
}

export const getAddressPatternFromSnapType = (snapType?: BitcoinNetwork) => {
  const BITCOIN_MAIN_NET_ADDRESS_PATTERN = /^(1|3|bc1)/;
  const BITCOIN_TEST_NET_ADDRESS_PATTERN = /^(m|n|2|tb1)/;
  return getSnapType() === BitcoinNetwork.Main ? BITCOIN_MAIN_NET_ADDRESS_PATTERN : BITCOIN_TEST_NET_ADDRESS_PATTERN;
}
