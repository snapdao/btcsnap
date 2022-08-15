import { BitcoinNetwork, BitcoinScriptType } from "../interface";

const CONNECTED_EXTENDED_PUB_KEY = "extendedPublicKey"

const extendedPubKeyPersistKey = (
  network: BitcoinNetwork,
  scriptType: BitcoinScriptType
) => `${CONNECTED_EXTENDED_PUB_KEY}-${network}-${scriptType}`

export const setConnectedExtendedPublicKey = (
  extendedPublicKey: string,
  network = BitcoinNetwork.Main,
  scriptType = BitcoinScriptType.P2PKH
) => {
  window.localStorage.setItem(extendedPubKeyPersistKey(network, scriptType), extendedPublicKey);
};

export const getConnectedExtendedPublicKey = (network = BitcoinNetwork.Main, scriptType = BitcoinScriptType.P2PKH) =>
  window.localStorage.getItem(extendedPubKeyPersistKey(network, scriptType));