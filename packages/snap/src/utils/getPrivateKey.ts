import * as bip32 from 'bip32';
import { BIP32Interface } from "bip32";
import { BitcoinNetwork, SLIP10Node, Wallet } from "../interface";
import { getNetwork } from '../bitcoin/getNetwork';
import { parseLightningPath } from "../bitcoin/cryptoPath";

const CRYPTO_CURVE = "secp256k1";

export const getPrivateKey = async (wallet: Wallet, hdPath: string) => {
  const {purpose, coinType, account, change, index} = parseLightningPath(hdPath);
  const network = coinType.value=== '0' ? getNetwork(BitcoinNetwork.Main) : getNetwork(BitcoinNetwork.Test);
  const path = ["m", purpose.value, coinType.value];

  const slip10Node = await wallet.request({
    method: "snap_getBip32Entropy",
    params: {
      path: path,
      curve: CRYPTO_CURVE
    },
  }) as SLIP10Node;

  const privateKeyBuffer = Buffer.from(slip10Node.privateKey, "hex");
  const chainCodeBuffer = Buffer.from(slip10Node.chainCode, "hex");
  const node: BIP32Interface = bip32.fromPrivateKey(privateKeyBuffer, chainCodeBuffer, network);
  //@ts-ignore
    // ignore checking since no function to set depth for node
  node.__DEPTH = slip10Node.depth;
  //@ts-ignore
  // ignore checking since no function to set index for node
  node.__INDEX = slip10Node.index;
  // const pk = node.deriveHardened(1281976168).derive(0).derive(0).publicKey;
  const deriveLNPath = () => {
    let nodeLN = node;
    [account, change, index].forEach(item => {
      if(item.isHardened) {
        nodeLN = nodeLN.deriveHardened(parseInt(item.value))
      }
      if(!item.isHardened) {
        nodeLN = nodeLN.derive(parseInt(item.value))
      }
    })
    return nodeLN
  }
  const privateKey = deriveLNPath().privateKey;

  return privateKey
}
