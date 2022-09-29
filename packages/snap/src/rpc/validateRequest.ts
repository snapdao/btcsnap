import { BitcoinNetwork, Wallet } from '../interface';
import { getPersistedData } from '../utils/manageState';
import { RpcRequest } from '../index';

const validateNetwork = async (wallet: Wallet, network: BitcoinNetwork) => {
  const snapNetwork = await getPersistedData(wallet, "network", "");
  if(snapNetwork && network !== snapNetwork) {
    throw Error("Network not match");
  }
}

export const validateRequest = async (wallet: Wallet, request: RpcRequest["request"]) => {
  switch (request.method) {
    case 'btc_getPublicExtendedKey':
    case 'btc_signPsbt':
      await validateNetwork(wallet, request.params.network);
  }
}
