import { query } from './query';
import { RequestType } from '../types';

const endpoint = `/v1/snap/balance/`;

export const balance = (userId: string, userPassword: string) => {
  return query(
    endpoint,
    RequestType.Post,
    {},
    { user_id: userId, user_password: userPassword },
  );
};
