import { queryWithCurrentUserInfo } from './query';
import { RequestType } from '../types';

const endpoint = '/v1/snap/getbtc/';

export type GetBtcResponse = {
  success: boolean
  error_code?: string;
  error_message?: string;
  error_description?: string;
} | {
  address: string
}[]

export const getBtc = (): Promise<GetBtcResponse> => {
  return queryWithCurrentUserInfo(endpoint, RequestType.Get, {});
};
