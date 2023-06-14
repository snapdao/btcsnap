import { MetaMaskInpageProvider } from '@metamask/providers';
import { BitcoinNetwork, BitcoinScriptType } from '../interface';
import { register } from '../services/CryptoService/register';
import { getAppStore } from '../mobx';
import { SnapError } from '../errors';
import { logger } from '../logger';

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

const { ethereum } = window;

const getSnapInfoFromNetwork = (isTestnet = false) => {
  const snapId = 'npm:@velygood/btcsnap';
  const store = getAppStore();

  return {
    snap: `${snapId}-${isTestnet || store.settings.network === BitcoinNetwork.Test ? BitcoinNetwork.Test : BitcoinNetwork.Main}`,
    version: '1.2.3',
  };
};

export async function connect(cb: (connected: boolean) => void, isTestnet = false) {
  let connected = false;
  const snapInfo = getSnapInfoFromNetwork(isTestnet);
  try {
    const result: any = await ethereum.request({
      method: 'wallet_requestSnaps',
      params: {
        [snapInfo.snap]: {
          version: snapInfo.version,
        },
      }
    });

    const hasError = !!result?.snaps?.[getSnapInfoFromNetwork().snap]?.error;
    connected = !hasError;
  } finally {
    await cb(connected);
  }
}

export const switchNetworkAndSnapIfNeeded = async (nextNetwork: BitcoinNetwork) => {
  const isTestnet = nextNetwork === BitcoinNetwork.Test;
  const store = getAppStore();
  try {
    store.runtime.setSwapping(true);
    store.disconnectAccount();
    store.settings.setNetwork(nextNetwork);
    await connect(async () => {
      const { mfp, xpubs } = await getAllExtendedPublicKeys(isTestnet);
      await register(xpubs, mfp);
    }, isTestnet);
  } finally {
    store.runtime.setSwapping(false);
  }
};

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
    return (await ethereum.request({
      method: 'wallet_invokeSnap',
      params: {
        snapId: getSnapInfoFromNetwork().snap,
        request: {
          method: 'btc_getPublicExtendedKey',
          params: {
            network: networkParams,
            scriptType,
          },
        },
      },
    })) as ExtendedPublicKey;
  } catch (err: any) {
    const error = new SnapError(
      err?.message || 'Get extended public key failed',
    );
    logger.error(error);
    throw error;
  }
}

interface AllXpubs {
  mfp: string;
  xpubs: string[];
}

export async function getAllExtendedPublicKeys(isTestnet = false): Promise<AllXpubs> {
  try {
    return (await ethereum.request({
      method: 'wallet_invokeSnap',
      params: {
        snapId: getSnapInfoFromNetwork(isTestnet).snap,
        request: {
          method: 'btc_getAllXpubs',
          params: {},
        },
      },
    })) as AllXpubs;
  } catch (err: any) {
    const error = new SnapError(
      err?.message || 'Get extended public key failed',
    );
    logger.error(error);
    throw error;
  }
}

export async function getMasterFingerprint() {
  try {
    return await ethereum.request({
      method: 'wallet_invokeSnap',
      params: {
        snapId: getSnapInfoFromNetwork().snap,
        request: {
          method: 'btc_getMasterFingerprint',
        },
      },
    });
  } catch (err: any) {
    const error = new SnapError(
      err?.message || 'Snap get master fingerprint failed',
    );
    logger.error(error);
    return '';
  }
}

export async function updateNetworkInSnap(network: BitcoinNetwork) {
  const networkParams = network === BitcoinNetwork.Main ? 'main' : 'test';
  try {
    return await ethereum.request({
      method: 'wallet_invokeSnap',
      params: {
        snapId: getSnapInfoFromNetwork().snap,
        request: {
          method: 'btc_network',
          params: {
            action: 'set',
            network: networkParams,
          },
        },
      },
    });
  } catch (err: any) {
    const error = new SnapError(err?.message || 'Snap set Network failed');
    logger.error(error);
    throw error;
  }
}

export async function signPsbt(
  base64Psbt: string,
  network: BitcoinNetwork,
  scriptType: BitcoinScriptType,
) {
  const networkParams = network === BitcoinNetwork.Main ? 'main' : 'test';

  try {
    return (await ethereum.request({
      method: 'wallet_invokeSnap',
      params: {
        snapId: getSnapInfoFromNetwork().snap,
        request: {
          method: 'btc_signPsbt',
          params: {
            psbt: base64Psbt,
            network: networkParams,
            scriptType,
          },
        },
      },
    })) as Promise<{ txId: string; txHex: string }>;
  } catch (err: any) {
    const error = new SnapError(err?.message || 'Sign PSBT failed');
    logger.error(error);
    throw error;
  }
}

export enum GetLNWalletDataKey {
  Password = 'password',
  Credential = 'credential',
  PubKey = 'pubkey',
}

export async function getLNWalletData(
  key: GetLNWalletDataKey,
  walletId?: string,
  type?: 'get' | 'refresh',
) {
  try {
    return await ethereum.request<string>({
      method: 'wallet_invokeSnap',
      params: {
        snapId: getSnapInfoFromNetwork().snap,
        request: {
          method: 'btc_getLNDataFromSnap',
          params: {
            key,
            ...(walletId && { walletId }),
            ...(type && { type }),
          },
        },
      },
    });
  } catch (err: any) {
    const error = new SnapError(err?.message || 'Get LNWalletData failed');
    logger.error(error);
    throw error;
  }
}
export interface SaveLNData {
  walletId: string;
  credential: string;
  password: string;
}

export async function saveLNDataToSnap({
  walletId,
  credential,
  password,
}: SaveLNData) {
  try {
    return await ethereum.request<string>({
      method: 'wallet_invokeSnap',
      params: {
        snapId: getSnapInfoFromNetwork().snap,
        request: {
          method: 'btc_saveLNDataToSnap',
          params: {
            walletId,
            credential,
            password,
          },
        },
      },
    });
  } catch (err: any) {
    const error = new SnapError(err?.message || 'Save LNData failed');
    logger.error(error);
    throw error;
  }
}

export async function signLNInvoice(
  invoice: string,
): Promise<string | undefined | null> {
  try {
    return ethereum.request<string>({
      method: 'wallet_invokeSnap',
      params: {
        snapId: getSnapInfoFromNetwork().snap,
        request: {
          method: 'btc_signLNInvoice',
          params: {
            invoice,
          },
        },
      },
    });
  } catch (err: any) {
    const error = new SnapError(err?.message || 'Sign invoice failed');
    logger.error(error);
    throw error;
  }
}
