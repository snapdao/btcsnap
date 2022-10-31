import * as bip32 from 'bip32';
import { BIP32Interface } from "bip32";
import { BitcoinNetwork, SLIP10Node, Wallet } from "../interface";
import { getNetwork } from '../bitcoin/getNetwork';

const CRYPTO_CURVE = "secp256k1";

export const getPrivateKey = async (wallet: Wallet, hdPath: string) => {
  let nodePath = hdPath.split("/");
  let network = nodePath[2] === "0" ? getNetwork(BitcoinNetwork.Main) : getNetwork(BitcoinNetwork.Test);
  let path = nodePath.slice(0,3);

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

  const privateKey = node.deriveHardened(0).derive(0).derive(0).privateKey;

  return privateKey
}
