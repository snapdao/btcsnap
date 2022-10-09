import { getNetwork } from './bitcoin/getNetwork';
import {Wallet, MetamaskBTCRpcRequest} from './interface';
import { getExtendedPublicKey, signPsbt, masterFingerprint, manageNetwork, validateRequest } from './rpc';

declare let wallet: Wallet;
  
export type RpcRequest = {
  origin: string
  request: MetamaskBTCRpcRequest
}

export const onRpcRequest = async({origin, request}:RpcRequest) => {

  await validateRequest(wallet, request);

  switch (request.method) {
    case 'btc_getPublicExtendedKey':
      return getExtendedPublicKey(origin, wallet, request.params.scriptType, getNetwork(request.params.network))
    case 'btc_signPsbt':
      const psbt = request.params.psbt;
      return signPsbt(origin, wallet, psbt, request.params.network, request.params.scriptType)
    case 'btc_masterFingerprint':
      return masterFingerprint(wallet, request.params.action);
    case 'btc_network':
      return manageNetwork(origin, wallet, request.params.action, request.params.network);
    default:
      throw new Error('Method not found.');
  }
};
