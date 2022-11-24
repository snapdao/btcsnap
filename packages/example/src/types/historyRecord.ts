import { TransactionDetail } from './transaction';
import { InvoiceDetail } from './invoices';

export enum HistoryRecordType {
  BitcoinTransaction,
  LightningInvoice
}

interface BaseRecord {
  id: string,
  loading: boolean,
  title: string,
  amount: string | number,
  label?: string,
  content?: string,
  datetime: number,
}

export interface HistoryRecord extends BaseRecord {
  type: HistoryRecordType,
  data: TransactionDetail | InvoiceDetail
}
