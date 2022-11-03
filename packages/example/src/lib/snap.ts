import { MetaMaskInpageProvider } from '@metamask/providers';
import { BitcoinNetwork, BitcoinScriptType } from '../interface';
import { SnapError } from "../errors";
import { logger } from "../logger";

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

const { ethereum } = window;

const snapId = 'npm:btcsnap';

export async function connect(cb: (connected: boolean) => void) {
  let connected = false;
  try {
    const result: any = await ethereum.request({
      method: 'wallet_enable',
      params: [
        {
          wallet_snap: {
            [snapId]: {
              version: '1.0.0',
            },
          },
        },
      ],
    });

    const hasError = !!(result?.snaps?.[snapId]?.error);
    connected = !hasError;
  } finally {
    cb(connected);
  }
}

/**
 *
 * get the extended publicKey from btcsnap
 *
 * @param network
 * @param scriptType
 * @param cb?
 * @returns
 */

interface ExtendedPublicKey {
  xpub: string;
  mfp: string;
}

export async function getExtendedPublicKey(
  network: BitcoinNetwork,
  scriptType: BitcoinScriptType,
): Promise<ExtendedPublicKey> {
  const networkParams = network === BitcoinNetwork.Main ? 'main' : 'test';

  try {
    return await ethereum.request({
      method: 'wallet_invokeSnap',
      params: [
        snapId,
        {
          method: 'btc_getPublicExtendedKey',
          params: {
            network: networkParams,
            scriptType,
          },
        },
      ],
    }) as ExtendedPublicKey;
  } catch (err: any) {
    const error = new SnapError(err?.message || "Get extended public key failed")
    logger.error(error);
    throw error;
  }
}

export async function getMasterFingerprint() {
  try {
    return await ethereum.request({
      method: 'wallet_invokeSnap',
      params: [
        snapId,
        {
          method: 'btc_getMasterFingerprint',
        },
      ],
    });
  } catch (err: any) {
    const error = new SnapError(err?.message || "Snap get master fingerprint failed")
    logger.error(error);
    return "";
  }
}

export async function updateNetworkInSnap(network: BitcoinNetwork) {
  const networkParams = network === BitcoinNetwork.Main ? 'main' : 'test';
  try {
    return await ethereum.request({
      method: 'wallet_invokeSnap',
      params: [
        snapId,
        {
          method: 'btc_network',
          params: {
            action: "set",
            network: networkParams,
          }
        },
      ],
    });
  } catch (err: any) {
    const error = new SnapError(err?.message || "Snap set Network failed")
    logger.error(error);
    throw error;
  }
}

export async function signPsbt(base64Psbt: string, network: BitcoinNetwork, scriptType: BitcoinScriptType) {
  const networkParams = network === BitcoinNetwork.Main ? 'main' : 'test';

  try {
    return (await ethereum.request({
      method: 'wallet_invokeSnap',
      params: [
        snapId,
        {
          method: 'btc_signPsbt',
          params: {
            psbt: base64Psbt,
            network: networkParams,
            scriptType,
          },
        },
      ],
    })) as Promise<{ txId: string; txHex: string }>;
  } catch (err: any) {
    const error = new SnapError(err?.message || "Sign PSBT failed");
    logger.error(error);
    throw error;
  }
}
