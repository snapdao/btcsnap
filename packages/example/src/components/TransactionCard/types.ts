export enum TransactionType {
  SEND = "sent",
  RECEIVE = "received"
}

export enum TransactionStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed"
}

export interface TransactionDetail {
  ID: string;
  type: TransactionType;
  status: TransactionStatus;
  amount: number;
  address: string;
  date: number;
  marker?: number;
}
