import { BitcoinNetwork, BitcoinScriptType } from "../interface";
import { SupportedCoins } from "./supportedCoins";

export const EXTENDED_PUBKEY_PATH = {
  [BitcoinNetwork.Main]: {
    [BitcoinScriptType.P2PKH]: "M/44'/0'/0'",
    [BitcoinScriptType.P2SH_P2WPKH]: "M/49'/0'/0'",
    [BitcoinScriptType.P2WPKH]: "M/84'/0'/0'",
  },
  [BitcoinNetwork.Test]: {
    [BitcoinScriptType.P2PKH]: "M/44'/1'/0'",
    [BitcoinScriptType.P2SH_P2WPKH]: "M/49'/1'/0'",
    [BitcoinScriptType.P2WPKH]: "M/84'/1'/0'",
  }
}

export const NETWORK_SCRIPT_TO_COIN: Record<BitcoinNetwork, Record<BitcoinScriptType, SupportedCoins>> = {
  [BitcoinNetwork.Main]: {
    [BitcoinScriptType.P2PKH]: SupportedCoins.BTC_LEGACY,
    [BitcoinScriptType.P2SH_P2WPKH]: SupportedCoins.BTC,
    [BitcoinScriptType.P2WPKH]: SupportedCoins.BTC_NATIVE_SEGWIT,
  },
  [BitcoinNetwork.Test]: {
    [BitcoinScriptType.P2PKH]: SupportedCoins.BTC_TESTNET_LEGACY,
    [BitcoinScriptType.P2SH_P2WPKH]: SupportedCoins.BTC_TESTNET_SEGWIT,
    [BitcoinScriptType.P2WPKH]: SupportedCoins.BTC_TESTNET_NATIVE_SEGWIT,
  }
}
