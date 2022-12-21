import { query } from '../request-utils/query';
import { RequestType } from '../types';

const endpoint = '/v1/self_custody/register_extended_pub_key/';

export interface RegisterExtendedPubKeyResponse {
  extendedPubKey: string,
  hdPath: string,
  accountId: number,
  chainCoin: 'BTC' | 'BTC_TESTNET'
}

export const registerExtendedPubKey = (
  coin: 'BTC' | 'BTC_TESTNET',
  path: string,
  key: string,
  script_type: string,
  xfp: string
): Promise<RegisterExtendedPubKeyResponse> =>
  query(endpoint, RequestType.Post, {}, { coin, path, key, script_type }, xfp);
