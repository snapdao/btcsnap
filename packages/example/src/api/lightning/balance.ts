import { queryWithCurrentUserInfo } from './query';
import { RequestType } from '../types';

const endpoint = '/v1/snap/balance/';

interface LightningBalanceResponse {
  BTC: {
    AvailableBalance: string
  }
}

export const balance = (userId = ''): Promise<LightningBalanceResponse> => {
  return queryWithCurrentUserInfo(
    endpoint,
    RequestType.Get,
    {},
    { user_id: userId }
  );
};
