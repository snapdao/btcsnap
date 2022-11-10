import { query } from './query';
import { RequestType } from '../types';

const endpoint = `/v1/snap/balance/`;

export type CreateWalletResponse = {
  userId: string;
  userPassword: string;
  credential: {
    login: string;
    password: string;
  };
};

export const balance = (
  userId: string,
  userPassword: string,
): Promise<CreateWalletResponse> => {
  return query(
    endpoint,
    RequestType.Post,
    {},
    { user_id: userId, user_password: userPassword },
  );
};
