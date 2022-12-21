import { RequestType } from '../types';
import { query } from '../request-utils/query';
import { SupportedCoins } from '../../constant/supportedCoins';

const endpoint = '/v1/self_custody/push_transaction/';

export interface BroadcastData {
  hex: string;
  txid: string;
  from: string;
  address: string;
  amount: string;
  fee: string;
}

export const pushTransaction = (
  coinCode: SupportedCoins,
  txData: BroadcastData,
): Promise<Record<string, any>> => {
  return query(endpoint, RequestType.Post, {}, { coin: coinCode, origin_tx_id: txData.txid, ...txData });
};
