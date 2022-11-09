import { BackendAsset } from '../v1/types';
import { CHANNEL } from '../constant';
import { query } from './query';
import { RequestType } from '../types';

const endpoint = `/v1/snap/create_account/`;

export type CreateWalletResponse = {
  userId: string;
  userPassword: string;
  credential: {
    login: string;
    password: string;
  };
};

export const createWallet = (pubkey: string): Promise<CreateWalletResponse> => {
  return query(endpoint, RequestType.Post, {}, { pubkey });
};
