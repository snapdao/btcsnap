import { SupportedCoins } from '../../constant/supportedCoins';
import { query } from '../request-utils/query';
import { RequestType } from '../types';

const endpoint = '/v1/self_custody/send_info/';

export type SendInfoResponse = {
  pending: any[];
  spendables: {
    hdPath: string;
    value: number;
    voutN: number;
    txid: string;
  }[];
  unusedChangeAddressHdPath: string;
};

export const querySendInfo = (coinCode: SupportedCoins): Promise<SendInfoResponse> => {
  return query(endpoint, RequestType.Get, {}, { coin: coinCode });
};
