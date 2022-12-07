import {getNetwork} from './bitcoin/getNetwork';
import {Wallet, MetamaskBTCRpcRequest} from './interface';
import {
  getExtendedPublicKey,
  getAllXpubs,
  signPsbt,
  getMasterFingerprint,
  manageNetwork,
  validateRequest,
  saveLNDataToSnap,
  getLNDataFromSnap,
  signLNInvoice,
} from './rpc';
import { SnapError, RequestErrors } from './errors';

declare let wallet: Wallet;

export type RpcRequest = {
  origin: string;
  request: MetamaskBTCRpcRequest;
};

export const onRpcRequest = async ({origin, request}: RpcRequest) => {
  await validateRequest(wallet, origin, request);

  switch (request.method) {
    case 'btc_getPublicExtendedKey':
      return getExtendedPublicKey(
        origin,
        wallet,
        request.params.scriptType,
        getNetwork(request.params.network),
      );
    case 'btc_getAllXpubs':
      return getAllXpubs(
        origin,
        wallet,
      );
    case 'btc_signPsbt':
      const psbt = request.params.psbt;
      return signPsbt(
        origin,
        wallet,
        psbt,
        request.params.network,
        request.params.scriptType,
      );
    case 'btc_getMasterFingerprint':
      return getMasterFingerprint(wallet);
    case 'btc_network':
      return manageNetwork(
        origin,
        wallet,
        request.params.action,
        request.params.network,
      );
    case 'btc_saveLNDataToSnap':
      return saveLNDataToSnap(
        origin,
        wallet,
        request.params.walletId,
        request.params.credential,
        request.params.password,
      );
    case 'btc_getLNDataFromSnap':
      return getLNDataFromSnap(
        origin,
        wallet,
        {
          key: request.params.key,
          ...(request.params.walletId && {walletId: request.params.walletId}),
          ...(request.params.type && {type: request.params.type}),
        }
      );
    case 'btc_signLNInvoice':
      return signLNInvoice(origin, wallet, request.params.invoice);
    default:
      throw SnapError.of(RequestErrors.MethodNotSupport);
  }
};
