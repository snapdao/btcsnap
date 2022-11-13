import { queryWithUserInfo } from './query';
import { RequestType } from '../types';

const endpoint = `/v1/snap/balance/`;

interface LightningBalanceResponse {
  BTC: {
    AvailableBalance: string
  }
}

export const balance = (): Promise<LightningBalanceResponse> => {
  return queryWithUserInfo(
    endpoint,
    RequestType.Get,
    {},
  );
};
