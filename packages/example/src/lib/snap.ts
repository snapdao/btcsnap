import { MetaMaskInpageProvider } from '@metamask/providers';
import { BitcoinNetwork, BitcoinScriptType } from '../interface';
declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

const { ethereum } = window;

const snapId = 'npm:btcsnap';

export async function connect(cb: Function) {
  const result = await ethereum.request({
    method: 'wallet_enable',
    params: [
      {
        wallet_snap: { snapId: {} },
      },
    ],
  });

  if (result) {
    cb();
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

  const result = await ethereum.request({
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

  if (cb) {
    cb(result);
  }
}
