import { query } from '../lightning/query';
import { RequestType } from '../types';

const endpoint = '/v1/snap/getbtc/';

interface Props {
  id: string
  password: string
}

export type GetBtcResponse = {
  success: boolean
  error_code?: string;
  error_message?: string;
  error_description?: string;
} | {
  address: string
}[]

export const getBtc = ({ id, password }: Props ): Promise<GetBtcResponse> => {
  return query(endpoint, RequestType.Get, {}, {
    user_id: id,
    user_password: password,
  });
};
