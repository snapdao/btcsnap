export enum InvoiceTypes {
  Sent = 'Sent',
  Received = 'Received',
  OnChain = 'On-Chain Transaction',
  TopUp = 'Transaction',
}

export enum InvoiceStatus {
  Pending = 'pending',
  Succeed = 'succeed',
  Failed = 'failed',
  Expired = 'expired',
}

export interface InvoiceDetail {
  ID: string;
  type: InvoiceTypes;
  status: InvoiceStatus;
  amount: number;
  description?: string;
  date: number;
  paymentRequest?: string;
  fee?: number;
  address?: string
}
