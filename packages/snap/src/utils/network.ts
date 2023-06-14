import { Network, networks } from 'bitcoinjs-lib';
import { BitcoinNetwork } from '../interface';

const BITCOIN_MAINNET_COIN_TYPE = 0;
const BITCOIN_TESTNET_COIN_TYPE = 1;
const BITCOIN_MAIN_NET_ADDRESS_PATTERN = /^(1|3|bc1)/;
const BITCOIN_TEST_NET_ADDRESS_PATTERN = /^(m|n|2|tb1)/;

export const getSnapType = () => {
  return BitcoinNetwork.Main;
}

export const getNetwork = () => {
  const snapType = getSnapType();
  
  return snapType === BitcoinNetwork.Main ? networks.bitcoin : networks.testnet;
}

export const getCoinType = () => {
  const snapType = getSnapType();

  return snapType === BitcoinNetwork.Main ? BITCOIN_MAINNET_COIN_TYPE : BITCOIN_TESTNET_COIN_TYPE;
}

export const getAddressPattern = () => {
  const snapType = getSnapType();

  return snapType === BitcoinNetwork.Main ? BITCOIN_MAIN_NET_ADDRESS_PATTERN : BITCOIN_TEST_NET_ADDRESS_PATTERN;
}

// XXX: Keep redundant functions for future adjustments.
export const getNetworkFromCoinType = (coinType?: number | string): Network => {
  return getNetwork();
}

export const getSnapTypeFromNetwork = (network?: Network): BitcoinNetwork => {
  return getSnapType();
}

export const getNetworkFromSnapType = (snapType?: BitcoinNetwork): Network => {
  return getNetwork();
}

export const getCoinTypeFromSnapType = (snapType?: BitcoinNetwork) => {
  return getCoinType();
}

export const getAddressPatternFromSnapType = (snapType?: BitcoinNetwork) => {
  return getAddressPattern();
}