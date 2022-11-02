import { BitcoinNetwork, BitcoinUnit } from "../interface";

export type BitcoinUnits = "BTC" | "sats" | "tBTC" | "tsats" | "USD";

export const bitcoinUnitMap: Record<BitcoinNetwork, Record<BitcoinUnit, BitcoinUnits>> = {
  [BitcoinNetwork.Main] : {
    BTC: "BTC",
    Sats: "sats",
    Currency: "USD",
  },
  [BitcoinNetwork.Test] : {
    BTC: "tBTC",
    Sats: "tsats",
    Currency: "USD",
  }
}

export const isBTC = (unit: BitcoinUnits) => {
  return [bitcoinUnitMap[BitcoinNetwork.Main].BTC, bitcoinUnitMap[BitcoinNetwork.Test].BTC].includes(unit);
}
