import { queryWithCurrentUserInfo } from './query';
import { RequestType } from '../types';

const endpoint = '/v1/snap/add_invoice/';

interface LightningAddInvoiceResponse {
  paymentRequest: string; // invoice
  description: string;
  paymentHash: string;
  amt: number; // amount
  expireTime: number;
  timestamp: number;
  type: 'user_invoice' | string;
  ispaid?: boolean;
}

interface AddInvoiceArgs {
  amount: number;
  memo: string;
}

export const addInvoice = (
  args: AddInvoiceArgs,
): Promise<LightningAddInvoiceResponse> => {
  return queryWithCurrentUserInfo(
    endpoint,
    RequestType.Post,
    {},
    {
      amt: args.amount,
      memo: args.memo,
    },
  );
};
