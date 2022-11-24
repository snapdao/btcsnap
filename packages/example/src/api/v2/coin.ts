import { RequestType } from '../types';
import { query } from '../request-utils/query';
import { SupportedCoins } from '../../constant/supportedCoins';

const endpoint = '/v2/self_custody/coins/';

export type CoinsResponse = {
  coins: Record<SupportedCoins, { decimal: number; balance: string }>;
};

export const queryCoinV2 = (): Promise<CoinsResponse> => {
  return query(endpoint, RequestType.Get, {});
};
