import { queryWithUserInfo } from './query';
import { RequestType } from '../types';

const endpoint = '/v1/snap/pay_invoice/';

export type PayInvoiceResponse = any;

export const payInvoice = (
  invoice: string,
  signature: string
): Promise<PayInvoiceResponse> => {
  return queryWithUserInfo(
    endpoint,
    RequestType.Post,
    {},
    { invoice, signature },
  );
};
