import { queryWithCurrentUserInfo } from './query';
import { RequestType } from '../types';

const endpoint = '/v1/snap/pay_invoice/';

export type PayInvoiceResponse = any;

export const payInvoice = (
  invoice: string,
  signature: string
): Promise<PayInvoiceResponse> => {
  return queryWithCurrentUserInfo(
    endpoint,
    RequestType.Post,
    {},
    { invoice, signature },
  );
};
