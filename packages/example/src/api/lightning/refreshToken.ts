import { queryWithCurrentUserInfo } from './query';
import { RequestType } from '../types';

const endpoint = '/v1/snap/refresh_token/';

export interface LightningRefreshTokenResponse {
  category: 'receive',
  amount: number,
  confirmations: number,
  address: string,
  time: number
}

export const refreshToken = (): Promise<LightningRefreshTokenResponse> => {
  return queryWithCurrentUserInfo(
    endpoint,
    RequestType.Post,
    {},
  );
};
