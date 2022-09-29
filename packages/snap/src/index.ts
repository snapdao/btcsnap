import { getNetwork } from './bitcoin';
import {Wallet, MetamaskBTCRpcRequest} from './interface';
import { getExtendedPublicKey, signPsbt, masterFingerprint, manageNetwork, validateRequest } from './rpc';

declare let wallet: Wallet;
  
export type RpcRequest = {
  origin: string
  request: MetamaskBTCRpcRequest
}

export const onRpcRequest = async({origin, request}:RpcRequest) => {

  try {
    await validateRequest(wallet, request);
  } catch (error) {
    await wallet.request({
      method: 'snap_confirm',
      params: [
        {
          prompt: 'Something went wrong',
          description: error.message,
        },
      ],
    });
    throw error;
  }

  switch (request.method) {
    case 'btc_getPublicExtendedKey':
      return getExtendedPublicKey(origin, wallet, request.params.scriptType, getNetwork(request.params.network))
    case 'btc_signPsbt':
      const psbt = request.params.psbt;
      return signPsbt(wallet, psbt, request.params.network, request.params.scriptType)
    case 'btc_masterFingerprint':
      return masterFingerprint(wallet, request.params.action);
    case 'btc_network':
      return manageNetwork(origin, wallet, request.params.action, request.params.network);
    default:
      throw new Error('Method not found.');
  }
};
