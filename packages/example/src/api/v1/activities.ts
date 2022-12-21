import { SupportedCoins } from '../../constant/supportedCoins';
import { query } from '../request-utils/query';
import { RequestType } from '../types';

const endpoint = '/v1/self_custody/activities/';

interface ActivitiesRequest {
  coin: SupportedCoins;
  count: number;
  loadMoreTxs?: number;
  type?: 'send' | 'receive' | 'all';
}

export type ActivitiesResponse = {
  activities: Activity[];
};

export enum ActivityStatus {
  Confirming = 'Confirming',
  Complete = 'complete',
  Pending = 'pending',
  Failed = 'failed',
  ToBeMultiSigned = 'to_be_multi_signed',
  Other = 'other',
}

export type Activity = {
  id: string;
  action: string;
  address: string;
  amount: number;
  fee: number;
  canExpedite: boolean;
  coin: string;
  confirmThreshold: number;
  confirmedNum: number;
  contactName: string;
  canBoostTx: boolean;
  createdTime: number;
  currency: string;
  currencyAmount: number;
  currencySymbol: string;
  displayCode: string;
  explorerUrl: string;
  isInternal: boolean;
  memo: string | null;
  modifiedTime: number;
  status: ActivityStatus;
  subtitle: string;
  subtitleIsAddress: boolean;
  title: string;
  txid: string;
  hexstr: string;
  walletType: string;
  coinInfo: {
    decimal: number;
    displayCode: string;
    code: SupportedCoins;
    isToken: boolean;
    parent: SupportedCoins;
  };

  multiSignHashid?: string;
  callerSigned: boolean;
  pendingSigNumbers: number;
  senderAddresses?: string[];
  receiverAddresses?: [string, number][];
};

export const queryActivities = ({ count, type = 'all', coin, loadMoreTxs } :ActivitiesRequest): Promise<ActivitiesResponse> => {
  return query(endpoint, RequestType.Get, {}, { coin, activity_num: count, type, load_more_ts: loadMoreTxs });
};
