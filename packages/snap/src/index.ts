import {getNetwork} from './bitcoin/getNetwork';
import {Snap, MetamaskBTCRpcRequest} from './interface';
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
  signMessage,
} from './rpc';
import { SnapError, RequestErrors } from './errors';

// @ts-ignore
globalThis.Buffer = require('buffer/').Buffer;

declare let snap: Snap;

export type RpcRequest = {
  origin: string;
  request: MetamaskBTCRpcRequest;
};

export const onRpcRequest = async ({origin, request}: RpcRequest) => {
  await validateRequest(snap, origin, request);

  switch (request.method) {
    case 'btc_getPublicExtendedKey':
      return getExtendedPublicKey(
        origin,
        snap,
        request.params.scriptType,
        getNetwork(request.params.network),
      );
    case 'btc_getAllXpubs':
      return getAllXpubs(
        origin,
        snap,
      );
    case 'btc_signPsbt':
      const psbt = request.params.psbt;
      return signPsbt(
        origin,
        snap,
        psbt,
        request.params.network,
        request.params.scriptType,
      );
    case 'btc_getMasterFingerprint':
      return getMasterFingerprint(snap);
    case 'btc_network':
      return manageNetwork(
        origin,
        snap,
        request.params.action,
        request.params.network,
      );
    case 'btc_saveLNDataToSnap':
      return saveLNDataToSnap(
        origin,
        snap,
        request.params.walletId,
        request.params.credential,
        request.params.password,
      );
    case 'btc_getLNDataFromSnap':
      return getLNDataFromSnap(
        origin,
        snap,
        {
          key: request.params.key,
          ...(request.params.walletId && {walletId: request.params.walletId}),
          ...(request.params.type && {type: request.params.type}),
        }
      );
    case 'btc_signLNInvoice':
      return signLNInvoice(origin, snap, request.params.invoice);

    case 'btc_signMessage':
      return signMessage(
        origin,
        snap,
        request.params.message,
        request.params.protocol,
      );

    default:
      throw SnapError.of(RequestErrors.MethodNotSupport);
  }
};
