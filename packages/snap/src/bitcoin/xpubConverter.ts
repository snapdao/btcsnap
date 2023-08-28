import { ScriptType, BitcoinNetwork } from "../interface";
import { Network, networks } from 'bitcoinjs-lib';
import { encode, decode } from "bs58check";

type XpubPrefix = "xpub" | "tpub" | "ypub" | "upub" | "zpub" | "vpub";

// https://github.com/satoshilabs/slips/blob/master/slip-0132.md#registered-hd-version-bytes
const xpubPrefixes: Record<XpubPrefix, string> = {
  'xpub': '0488b21e',
  'tpub': '043587cf',
  'ypub': '049d7cb2',
  'upub': '044a5262',
  'zpub': '04b24746',
  'vpub': '045f1cf6',
}

const scriptTypeToXpubPrefix: Record<ScriptType, Record<BitcoinNetwork, XpubPrefix>> = {
  [ScriptType.P2PKH]: {
    main: 'xpub',
    test: 'tpub'
  },
  [ScriptType.P2SH_P2WPKH]: {
    main: 'ypub',
    test: 'upub'
  },
  [ScriptType.P2WPKH]: {
    main: 'zpub',
    test: 'vpub'
  },
}

export const convertXpub = (xpub: string, to: ScriptType, network: Network): string => {
  const net = network === networks.bitcoin ? BitcoinNetwork.Main : BitcoinNetwork.Test;
  const xpubPrefix = scriptTypeToXpubPrefix[to][net];

  let data = decode(xpub);
  data = data.slice(4);
  data = Buffer.concat([Buffer.from(xpubPrefixes[xpubPrefix], "hex"), data]);
  return encode(data);
}