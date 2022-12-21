import React from 'react';
import { HistoryRecord, HistoryRecordType } from '../../../types/';
import { TransactionDetailModal } from './TransactionDetailModal';
import { InvoiceDetailModal } from './InvoiceDetailModal';
import { TransactionDetail, InvoiceDetail } from '../../../types/';

interface RecordDetailProps {
  open: boolean;
  close: () => void;
  record: HistoryRecord
  parent?: HTMLElement
}

export const RecordDetail = ({ record, ...rest }: RecordDetailProps) => {

  switch (record.type) {
    case HistoryRecordType.BitcoinTransaction:
      return <TransactionDetailModal {...rest} details={record.data as TransactionDetail}/>;
    case HistoryRecordType.LightningInvoice:
      return <InvoiceDetailModal {...rest} invoice={record.data as InvoiceDetail}/>;
    default:
      return null;
  }
};
