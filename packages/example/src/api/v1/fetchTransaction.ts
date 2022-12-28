import { RequestType } from '../types';
import { query } from '../request-utils/query';
import { BitcoinNetworkCode } from '../../constant/supportedCoins';

const endpoint = '/v1/self_custody/fetch_raw_tx/';

export const fetchTransaction = (
  networkCode: BitcoinNetworkCode,
  txId: string,
): Promise<Record<string, any>> => {
  return query(endpoint, RequestType.Get, {}, { coin: networkCode, tx_id: txId });
};
