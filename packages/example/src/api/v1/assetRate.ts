import { query } from '../request-utils/query';
import { RequestType } from '../types';

const endpoint = '/v1/self_custody/asset_rate/';

export type CoinsResponse = {
  rates: {coin: string, rate: string}[];
};

export const queryAssetRate = (currency = 'USD'): Promise<CoinsResponse> => {
  return query(endpoint, RequestType.Get, {}, { currency });
};
