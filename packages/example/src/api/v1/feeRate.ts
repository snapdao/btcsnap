import { SupportedCoins } from '../../constant/supportedCoins';
import { query } from '../request-utils/query';
import { RequestType } from '../types';

const endpoint = '/v1/self_custody/fee_rate_advanced/';

export type FeeRateResponse = {
  feeEstimation: {
    feeRate: {
      30: number;
      60: number;
      70: number;
    },
    feeType: string;
    feeCoin: string;
  }
};

export const queryFeeRate = (
  coinCode: SupportedCoins,
): Promise<FeeRateResponse> => {
  return query(endpoint, RequestType.Get, {}, { chain_coin: coinCode });
};
