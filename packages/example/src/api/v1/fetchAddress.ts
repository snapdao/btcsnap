import { query } from '../request-utils/query';
import { RequestType } from '../types';
import { SupportedCoins } from '../../constant/supportedCoins';

const endpoint = '/v1/self_custody/fetch_addresses/';

interface Address {
  address: string;
  hdPath: string
}

interface OccupiedAddress extends Address {
  balance: string;
}

interface FetchAddressResponse {
  used: Address[]
  occupied: OccupiedAddress[];
  unused: Address[];
}

export const fetchAddresses = (
  xfp: string,
  xpub: string,
  assetCode: SupportedCoins,
): Promise<FetchAddressResponse> => {
  return query(endpoint, RequestType.Get, {}, { asset_coin: assetCode, pub_key: xpub }, xfp);
};
