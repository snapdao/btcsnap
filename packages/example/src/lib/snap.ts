import { MetaMaskInpageProvider } from '@metamask/providers';
import { BitcoinNetwork, BitcoinScriptType } from '../interface';

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
              version: '0.5.0-beta.2',
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
  cb?: (xpub: ExtendedPublicKey) => void,
) {
  const networkParams = network === BitcoinNetwork.Main ? 'main' : 'test';

  let result = {
    xpub: "",
    mfp: "",
  };

  try {
    result = await ethereum.request({
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
  } finally {
    if (cb){
      cb(result);
    }
  }
}

export async function getMasterFingerprint() {
  try {
    return await ethereum.request({
      method: 'wallet_invokeSnap',
      params: [
        snapId,
        {
          method: 'btc_masterFingerprint',
          params: {
            action: "get",
          }
        },
      ],
    });
  } catch (err) {
    console.error("Snap get master fingerprint failed", err);
    return "";
  }
}

export async function clearMasterFingerprint() {
  try {
    return await ethereum.request({
      method: 'wallet_invokeSnap',
      params: [
        snapId,
        {
          method: 'btc_masterFingerprint',
          params: {
            action: "clear",
          }
        },
      ],
    });
  } catch (err) {
    console.error("Snap clear master fingerprint failed", err);
    return "";
  }
}

export async function updateNetworkInSnap(network: BitcoinNetwork) {
  try {
    return await ethereum.request({
      method: 'wallet_invokeSnap',
      params: [
        snapId,
        {
          method: 'btc_network',
          params: {
            action: "set",
            network,
          }
        },
      ],
    });
  } catch (err) {
    console.error("Snap set Network failed", err);
    throw Error("Snap set Network failed");
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
  } catch (err) {
    console.error(err);
    throw new Error('Sign PSBT error');
  }
}
