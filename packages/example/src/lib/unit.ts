import { BitcoinUnit } from './../interface';
import { BitcoinNetwork } from '../interface';

export type BitcoinUnits = 'BTC' | 'sats' | 'tBTC' | 'tsats' | 'USD';

export const bitcoinUnitMap: Record<BitcoinNetwork, Record<BitcoinUnit, BitcoinUnits>> = {
  [BitcoinNetwork.Main] : {
    BTC: 'BTC',
    sats: 'sats',
    Currency: 'USD',
    tBTC: 'tBTC',
  },
  [BitcoinNetwork.Test] : {
    BTC: 'tBTC',
    sats: 'tsats',
    Currency: 'USD',
    tBTC: 'tBTC',
  }
};

export const isBTC = (unit: BitcoinUnits) => {
  return [bitcoinUnitMap[BitcoinNetwork.Main].BTC, bitcoinUnitMap[BitcoinNetwork.Test].BTC].includes(unit);
};
