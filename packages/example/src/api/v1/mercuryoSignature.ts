import { RequestType } from '../types';
import { query } from '../request-utils/query';

const endpoint = '/v1/web/mercuryo_signature/';

interface MercuryoSignature {
  signature: string
  txId: string
  [k: string]: any
}
export const queryMercuryoSignature = (
  address: string,
  path: string,
  xfp: string,
): Promise<MercuryoSignature> => {
  return query(endpoint, RequestType.Get, { xfp }, { address, path });
};
