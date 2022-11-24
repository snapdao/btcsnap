import { query } from './query';
import { RequestType } from '../types';

const endpoint = '/v1/snap/import_account/';

interface ImportWalletResponse {
  userId: string;
  userPassword: string;
}

export const importWallet = (pubkey: string, login: string, password: string): Promise<ImportWalletResponse> => {
  return query(endpoint, RequestType.Post, {}, { pubkey, login, password });
};
