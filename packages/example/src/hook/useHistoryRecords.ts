import { useTransaction } from './useTransaction';
import { useEffect, useState } from 'react';
import { useInvoices } from './useInvoices';
import { useAppStore } from '../mobx';
import { WalletType } from '../interface';
import {
  HistoryRecord,
  HistoryRecordType,
  InvoiceStatus,
  InvoiceTypes,
  TransactionStatus,
  TransactionTypes
} from "../types";

const getInvoiceLabel = (
  type: InvoiceTypes,
  description?: string,
): string => {
  if (!!description) {
    return '';
  }

  switch (type) {
    case InvoiceTypes.Sent:
      return 'Lightning Payment';
    case InvoiceTypes.Received:
      return 'Lightning Invoice';
    case InvoiceTypes.OnChain:
    case InvoiceTypes.TopUp:
      return 'Top Up';
  }
  return '';
};

interface HistoryRecordHookResponse {
  historyRecords: HistoryRecord[];
  loading: boolean;
  refresh: () => void;
  hasMore: boolean;
  loadMore: () => void;
}

export const useHistoryRecords = (size = 5, offset?: number): HistoryRecordHookResponse => {
  const {currentWalletType} = useAppStore();
  const {
    txList,
    loading: loadingTx,
    refresh: refreshTx,
    loadMore: loadMoreTx,
    hasMore: hasMoreTx
  } = useTransaction({size, offset});
  const {
    invoices,
    loading: loadingInvoice,
    refresh: refreshInvoice,
    loadMore: loadMoreInvoice,
    hasMore: hasMoreInvoice
  } = useInvoices({size, offset});
  const [historyRecords, setHistoryRecords] = useState<HistoryRecord[]>([]);

  useEffect(() => {
    if (currentWalletType === WalletType.BitcoinWallet) {
      setHistoryRecords(
        txList.map((tx) => {
          return {
            type: HistoryRecordType.BitcoinTransaction,
            id: tx.ID,
            loading: tx.status === TransactionStatus.Pending,
            title: tx.type,
            amount: tx.amount,
            label:  tx.type === TransactionTypes.Send ? 'To: ' : 'From: ',
            content: tx.address,
            datetime: tx.date,
            data: tx
          };
        }),
      );
    }
  }, [currentWalletType, txList])

  useEffect(() => {
    if (currentWalletType === WalletType.LightningWallet) {
      setHistoryRecords(
        invoices.map((invoice) => {
          return {
            type: HistoryRecordType.LightningInvoice,
            id: invoice.ID,
            loading: invoice.status === InvoiceStatus.Pending,
            title: invoice.status === InvoiceStatus.Expired ? InvoiceStatus.Expired : invoice.type,
            amount: invoice.amount,
            label: getInvoiceLabel(invoice.type, invoice.description),
            content: invoice.description,
            datetime: invoice.date,
            data: invoice,
          };
        }),
      );
    }
  }, [currentWalletType, invoices]);

  if (currentWalletType === WalletType.BitcoinWallet) {
    return {
      historyRecords,
      loading: loadingTx,
      refresh: refreshTx,
      hasMore: hasMoreTx,
      loadMore: loadMoreTx
    }
  }

  return {
    historyRecords,
    loading: loadingInvoice,
    refresh: refreshInvoice,
    hasMore: hasMoreInvoice,
    loadMore: loadMoreInvoice
  }
};
