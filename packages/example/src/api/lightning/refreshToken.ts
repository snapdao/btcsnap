import { query } from './query';
import { RequestType } from '../types';

const endpoint = '/v1/snap/refresh_token/';

export interface LightningRefreshTokenResponse {
  userId: string
  userPassword: string
}

export const refreshToken = (args: { login: string, password: string }): Promise<LightningRefreshTokenResponse> => {
  return query(
    endpoint,
    RequestType.Post,
    {},
    args,
  );
};
