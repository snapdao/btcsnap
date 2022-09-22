export enum TransactionTypes {
  Send = "sent",
  Receive = "received"
}

export enum TransactionStatus {
  Pending = "pending",
  Confirmed = "confirmed",
  Failed = "failed"
}

export interface TransactionDetail {
  ID: string;
  type: string;
  status: string;
  amount: number;
  address: string;
  date: number;
  marker?: number;
}
