import { RequestType } from '../types';
import { query } from '../request-utils/query';

const endpoint = '/v1/web/fiat_record/';

export interface FiatRecord {
  partner: string,
  record_id: string,
  type: 'withdraw' | 'buy',
  status: 'new' | 'pending' | 'order_scheduled' | 'paid' | 'cancelled' | 'order_failed' | 'descriptor_failed',
  tx: {
    id: string,
    address: string
  },
  amount: string,
  currency: string,
  fiat_amount: string,
  fiat_currency: string
  [k: string]: any
}

export const queryFiatRecord = (
  recordId: string,
): Promise<FiatRecord> => {
  return query(endpoint, RequestType.Get, {}, { record_id: recordId });
};
