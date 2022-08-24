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
  amount: string;
  address: string;
  date: number;
}