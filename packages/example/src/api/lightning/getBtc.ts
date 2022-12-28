import { queryWithCurrentUserInfo, ErrorResponse } from './query';
import { RequestType } from '../types';

const endpoint = '/v1/snap/getbtc/';

export type GetBtcResponse = ErrorResponse | {
  address: string
}[]

export const getBtc = (): Promise<GetBtcResponse> => {
  return queryWithCurrentUserInfo(endpoint, RequestType.Get, {});
};
