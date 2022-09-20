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
              version: '0.4.0',
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
 * get the extened publicKey from btcsnap
 *
 * @param network
 * @returns
 */

export async function getExtendedPublicKey(
  network: BitcoinNetwork,
  cb?: Function,
) {
  const networkParams = network === BitcoinNetwork.Main ? 'main' : 'test';

  let result = null;
  try {
    result = await ethereum.request({
      method: 'wallet_invokeSnap',
      params: [
        snapId,
        {
          method: 'btc_getPublicExtendedKey',
          params: {
            network: networkParams,
          },
        },
      ],
    });
  } finally {
    if (cb){
      cb(result);
    }
  }
}

export async function signPsbt(base64Psbt: string, network: BitcoinNetwork) {
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
          },
        },
      ],
    })) as Promise<{ txId: string; txHex: string }>;
  } catch (err) {
    console.error(err);
    throw new Error('Sign PSBT error');
  }
}
