import { query } from './query';
import { RequestType } from '../types';

const endpoint = '/v1/snap/create_account/';

export type CreateWalletResponse = {
  success: boolean
  userId: string;
  userPassword: string;
  credential: {
    login: string;
    password: string;
  };
  error_code?: string;
  error_message?: string;
  error_description?: string;
};

export const createWallet = (pubkey: string): Promise<CreateWalletResponse> => {
  return query(endpoint, RequestType.Post, {}, { pubkey });
};
