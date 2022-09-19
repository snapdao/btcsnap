import { BitcoinNetwork, BitcoinUnit } from "../interface";
import { btcToSatoshi, satoshiToBTC } from "./helper";
import { BigNumber } from "bignumber.js";

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

export const currencyToBTC = (currencyAmount: number, targetUnit: BitcoinUnit, rate: number) => {
  if(targetUnit === BitcoinUnit.BTC) {
    return new BigNumber(currencyAmount).dividedBy(rate).toNumber();
  }
  return satoshiToBTC(new BigNumber(currencyAmount).dividedBy(rate).toNumber())
}

export const btcToCurrency = (amount: number, originUnit: BitcoinUnit, rate: number) => {
  if(originUnit === BitcoinUnit.BTC) {
    return new BigNumber(amount).times(rate).toFixed(2);
  }
  return new BigNumber(btcToSatoshi(amount)).times(rate).toFixed(2);
}