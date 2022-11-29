export enum TransactionTypes {
  Sent = 'sent',
  Received = 'received'
}

export enum TransactionStatus {
  Pending = 'pending',
  Confirmed = 'confirmed',
  Failed = 'failed'
}

export interface TransactionDetail {
  ID: string;
  type: TransactionTypes;
  status: TransactionStatus;
  amount: number;
  address: string;
  date: number;
  fee?: number;
  url?: string;
  marker?: number;
  confirmedNum?: number;
  confirmThreshold?: number;
  from: string;
  to: string;
}
