import { getNetwork } from './bitcoin';
import {Wallet, MetamaskBTCRpcRequest} from './interface'
import { getExtendedPublicKey, signPsbt} from './rpc'
import { masterFingerprint } from "./rpc/masterFingerprint";

declare let wallet: Wallet;
  
type rpcRequest = {
  origin: string
  request: MetamaskBTCRpcRequest
}

export const onRpcRequest = async({origin, request}:rpcRequest) => {
  switch (request.method) {
    case 'btc_getPublicExtendedKey':
      return getExtendedPublicKey(wallet, request.params.scriptType, getNetwork(request.params.network))
    case 'btc_signPsbt':
      const psbt = request.params.psbt;
      return signPsbt(wallet, psbt, getNetwork(request.params.network), request.params.scriptType)
    case 'btc_masterFingerprint':
      return masterFingerprint(wallet, request.params.action);
    default:
      throw new Error('Method not found.');
  }
};
