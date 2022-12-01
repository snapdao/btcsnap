import { queryWithCurrentUserInfo } from './query';
import { RequestType } from '../types';

const endpoint = '/v1/snap/pending_tx/';

type LightningPendingTxResponse = PendingTx[]

export interface PendingTx {
  category: 'receive',
  amount: number,
  confirmations: number,
  address: string,
  time: number
}

export const pendingTx = (): Promise<LightningPendingTxResponse> => {
  return queryWithCurrentUserInfo(
    endpoint,
    RequestType.Get,
    {},
  );
};
