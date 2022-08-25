import { BitcoinNetwork } from "../interface";

const GLOBAL_DATA_PREFIX = "btcsnap-global"

interface GlobalData {
  xpub: Record<BitcoinNetwork, string>;
  network: BitcoinNetwork
}

export const getStoredGlobalData = (): GlobalData => {
  const globalData = localStorage.getItem(GLOBAL_DATA_PREFIX);
  if (globalData) {
    return JSON.parse(globalData)
  }
  return {
    xpub: {
      [BitcoinNetwork.Main]: "",
      [BitcoinNetwork.Test]: ""
    },
    network: BitcoinNetwork.Main,
  }
}

export const updateStoredXpub = (xpub: string, network: BitcoinNetwork) => {
  const localGlobalData = getStoredGlobalData();
  const newLocalGlobalData = {
    ...localGlobalData,
    xpub: {
      ...localGlobalData.xpub,
      [network]: xpub
    }
  }
  localStorage.setItem(GLOBAL_DATA_PREFIX, JSON.stringify(newLocalGlobalData));
}

export const updateStoredNetwork = (network: BitcoinNetwork) => {
  const localGlobalData = getStoredGlobalData();
  const newLocalGlobalData = {
    ...localGlobalData,
    network,
  }
  localStorage.setItem(GLOBAL_DATA_PREFIX, JSON.stringify(newLocalGlobalData));
}
