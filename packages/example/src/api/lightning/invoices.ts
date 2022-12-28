import { queryWithCurrentUserInfo } from './query';
import { RequestType } from '../types';

const endpoint = '/v1/snap/invoices/';

export interface LightningInvoicesResponse {
  paymentRequest: string; // invoice
  description: string;
  paymentHash: string;
  amt: number; // amount
  expireTime: number;
  timestamp: number;
  type: 'user_invoice' | string;
  ispaid?: boolean
}

export const invoices = (limit = 0, offset = 0): Promise<LightningInvoicesResponse[]> => {
  return queryWithCurrentUserInfo(
    endpoint,
    RequestType.Get,
    {},
    { limit, offset }
  );
};
