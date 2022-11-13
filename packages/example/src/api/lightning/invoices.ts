import { queryWithUserInfo } from './query';
import { RequestType } from '../types';

const endpoint = `/v1/snap/invoices/`;

interface LightningInvoicesResponse {
  paymentRequest: string; // invoice
  description: string;
  paymentHash: string;
  amt: number; // amount
  expireTime: number;
  timestamp: number;
  type: "user_invoice" | string;
  ispaid?: boolean
}

export const invoices = (): Promise<LightningInvoicesResponse> => {
  return queryWithUserInfo(
    endpoint,
    RequestType.Get,
    {},
  );
};
