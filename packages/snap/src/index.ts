import { getNetwork } from './bitcoin/getNetwork';
import {Wallet, MetamaskBTCRpcRequest} from './interface';
import {
  getExtendedPublicKey,
  signPsbt,
  getMasterFingerprint,
  manageNetwork,
  validateRequest,
  saveLNDataToSnap,
  getLNDataFromSnap,
  signLNInvoice
} from './rpc';

declare let wallet: Wallet;

export type RpcRequest = {
  origin: string
  request: MetamaskBTCRpcRequest
}

export const onRpcRequest = async({origin, request}:RpcRequest) => {
  await validateRequest(wallet, origin, request);

  switch (request.method) {
    case 'btc_getPublicExtendedKey':
      return getExtendedPublicKey(origin, wallet, request.params.scriptType, getNetwork(request.params.network))
    case 'btc_signPsbt':
      const psbt = request.params.psbt;
      return signPsbt(origin, wallet, psbt, request.params.network, request.params.scriptType)
    case 'btc_getMasterFingerprint':
      return getMasterFingerprint(wallet);
    case 'btc_network':
      return manageNetwork(origin, wallet, request.params.action, request.params.network);
    case 'btc_saveLNDataToSnap':
      return saveLNDataToSnap(
        origin,
        wallet,
        request.params.walletId,
        request.params.credential,
        request.params.password,
        request.params.hdPath
      );
    case 'btc_getLNDataFromSnap':
      return getLNDataFromSnap(origin, wallet, request.params.walletId, request.params.key, request.params.hdPath);
    case 'btc_signLNInvoice':
      return signLNInvoice(origin, wallet, request.params.invoice, request.params.hdPath);
    default:
      throw new Error('Method not found.');
  }
};
