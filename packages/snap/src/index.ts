import { getNetwork } from './bitcoin';
import {Wallet, ScriptType, MetamaskBTCRpcRequest} from './interface'
import { getExtendedPublicKey, signPsbt} from './rpc'

declare let wallet: Wallet;
  
type rpcReqeust = {
  origin: string
  request: MetamaskBTCRpcRequest
}

export const onRpcRequest = async({origin, request}:rpcReqeust) => {
  switch (request.method) {
    case 'btc_getPublicExtendedKey':
      return getExtendedPublicKey(wallet, ScriptType.P2PKH, getNetwork(request.params.network))
    case 'btc_signPsbt':
      const psbt = request.params.psbt;
      return signPsbt(wallet, psbt, getNetwork(request.params.network))
    default:
      throw new Error('Method not found.');
  }
};
