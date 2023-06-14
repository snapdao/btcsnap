import { Network, networks } from 'bitcoinjs-lib';
import { BitcoinNetwork } from '../interface';

const BITCOIN_MAINNET_COIN_TYPE = 0;
const BITCOIN_TESTNET_COIN_TYPE = 1;
const BITCOIN_MAIN_NET_ADDRESS_PATTERN = /^(1|3|bc1)/;
const BITCOIN_TEST_NET_ADDRESS_PATTERN = /^(m|n|2|tb1)/;

const isPartialMode = () => [BitcoinNetwork.Main, BitcoinNetwork.Test].includes(process.env.NETWORK as BitcoinNetwork);

const determineNetworkType = (snapType: BitcoinNetwork) => {
  return isPartialMode() ? process.env.NETWORK as BitcoinNetwork : snapType;
}

export const getNetwork = (snapType: BitcoinNetwork) => {
  return determineNetworkType(snapType) === BitcoinNetwork.Main ? networks.bitcoin : networks.testnet;
}

export const getCoinType = (snapType?: BitcoinNetwork) => {
  return determineNetworkType(snapType) === BitcoinNetwork.Main ? BITCOIN_MAINNET_COIN_TYPE : BITCOIN_TESTNET_COIN_TYPE;
}

export const getAddressPattern = (snapType?: BitcoinNetwork) => {
  return determineNetworkType(snapType) === BitcoinNetwork.Main ? BITCOIN_MAIN_NET_ADDRESS_PATTERN : BITCOIN_TEST_NET_ADDRESS_PATTERN;
}

// XXX: Keep redundant functions for future adjustments.
export const getNetworkFromCoinType = (coinType?: number | string): Network => {
  return getNetwork([0, '0'].includes(coinType) ? BitcoinNetwork.Main : BitcoinNetwork.Test);
}

export const getSnapTypeFromNetwork = (network?: Network): BitcoinNetwork => {
  return determineNetworkType(network == networks.bitcoin ? BitcoinNetwork.Main : BitcoinNetwork.Test);
}

export const getNetworkFromSnapType = (snapType?: BitcoinNetwork): Network => {
  return getNetwork(snapType);
}

export const getCoinTypeFromSnapType = (snapType?: BitcoinNetwork) => {
  return getCoinType(snapType);
}

export const getAddressPatternFromSnapType = (snapType?: BitcoinNetwork) => {
  return getAddressPattern(snapType);
}

export const getAllTheSupportedSnapTypes = () => {
  return isPartialMode() ? [process.env.NETWORK as BitcoinNetwork] : Object.values(BitcoinNetwork);
}