import { queryWithCurrentUserInfo } from './query';
import { RequestType } from '../types';

const endpoint = '/v1/snap/txs/';

interface PayInvoice {
  type: 'paid_invoice',
  value: number,
  fee: number
  memo: string
  timestamp: number | string,
  payment_preimage?: string;
}

interface BitcoinTx {
  type: 'bitcoind_tx'
  category: 'receive',
  amount: number,
  confirmations: number,
  address: string;
  time: number
}

export type LightningTransaction =  PayInvoice | BitcoinTx

export const lightningTxs = (limit = 0, offset = 0): Promise<LightningTransaction[]> => {
  return queryWithCurrentUserInfo(
    endpoint,
    RequestType.Get,
    {},
    { limit, offset }
  );
};
