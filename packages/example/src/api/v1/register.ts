import { BackendAsset } from './types';
import { CHANNEL } from '../constant';
import { query } from '../request-utils/query';
import { RequestType } from '../types';

const endpoint = '/v1/self_custody/register/';

export type RegisterResponse = {
  currency: string;
  coins: Record<string, BackendAsset>;
};

export const register = (
  hdToken: string
): Promise<RegisterResponse> => {
  return query(endpoint, RequestType.Post, {}, { channel: CHANNEL }, hdToken);
};
