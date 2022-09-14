import { BitcoinNetwork } from "../interface";

export enum Unit {
  BTC = 'BTC',
  Sats = 'Sats'
}

export type BitcoinUnits = "BTC" | "sats" | "tBTC" | "tsats";

export const bitcoinUnitMap: Record<BitcoinNetwork, Record<Unit, BitcoinUnits>> = {
  [BitcoinNetwork.Main] : {
    BTC: "BTC",
    Sats: "sats",
  },
  [BitcoinNetwork.Test] : {
    BTC: "tBTC",
    Sats: "tsats"
  }
}

export const isBTC = (unit: BitcoinUnits) => {
  return [bitcoinUnitMap[BitcoinNetwork.Main].BTC, bitcoinUnitMap[BitcoinNetwork.Test].BTC].includes(unit);
}