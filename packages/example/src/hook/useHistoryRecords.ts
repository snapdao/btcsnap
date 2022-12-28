import { satoshiToBTC } from './../lib/helper';
import { useTransaction } from './useTransaction';
import { useEffect, useState } from 'react';
import { useInvoices } from './useInvoices';
import { useAppStore } from '../mobx';
import { BitcoinUnit, WalletType } from '../interface';
import {
  HistoryRecord,
  HistoryRecordType,
  InvoiceStatus,
  InvoiceTypes,
  TransactionStatus,
  TransactionTypes
} from '../types';
import BigNumber from 'bignumber.js';

const getInvoiceLabel = (
  type: InvoiceTypes,
  description?: string,
): string => {
  if (description) {
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
  error?: string;
}

export const useHistoryRecords = (size = 5, offset?: number): HistoryRecordHookResponse => {
  const { currentWalletType, currentUnit } = useAppStore();
  const {
    txList,
    loading: loadingTx,
    refresh: refreshTx,
    loadMore: loadMoreTx,
    hasMore: hasMoreTx,
    error: errorTx,
  } = useTransaction({ size, offset });
  const {
    invoices,
    loading: loadingInvoice,
    refresh: refreshInvoice,
    loadMore: loadMoreInvoice,
    hasMore: hasMoreInvoice,
    error: errorInvoice,
  } = useInvoices({ size, offset });
  const [historyRecords, setHistoryRecords] = useState<HistoryRecord[]>([]);

  useEffect(() => {
    const isToBtcUnit = currentUnit === BitcoinUnit.BTC;
    if (currentWalletType === WalletType.BitcoinWallet) {
      setHistoryRecords(
        txList.map((tx) => {
          return {
            type: HistoryRecordType.BitcoinTransaction,
            id: tx.ID,
            loading: tx.status === TransactionStatus.Pending,
            title: tx.type,
            amount: isToBtcUnit ? satoshiToBTC(tx.amount) : tx.amount,
            label:  tx.type === TransactionTypes.Sent ? 'To: ' : 'From: ',
            content: `${tx.address.slice(0, 6)}...${tx.address.slice(-6)}`,
            datetime: tx.date,
            data: tx
          };
        }),
      );
    }
  }, [currentWalletType, currentUnit, txList]);

  useEffect(() => {
    const isToBtcUnit = currentUnit === BitcoinUnit.BTC;
    if (currentWalletType === WalletType.LightningWallet) {
      setHistoryRecords(
        invoices.map((invoice) => {
          let title = '';
          switch (invoice.status){
            case InvoiceStatus.Pending:
              title = 'To Be Received';
              break;
            case InvoiceStatus.Expired:
              title = InvoiceStatus.Expired;
              break;
            default:
              title = invoice.type;
          }

          return {
            type: HistoryRecordType.LightningInvoice,
            id: invoice.ID,
            loading: invoice.status === InvoiceStatus.Pending,
            title,
            amount: isToBtcUnit ? BigNumber(satoshiToBTC(invoice.amount)).toFixed() : invoice.amount,
            label: getInvoiceLabel(invoice.type, invoice.description),
            content: invoice.description,
            datetime: invoice.date,
            data: invoice,
          };
        }),
      );
    }
  }, [currentWalletType, currentUnit, invoices]);

  if (currentWalletType === WalletType.BitcoinWallet) {
    return {
      historyRecords,
      loading: loadingTx,
      refresh: refreshTx,
      hasMore: hasMoreTx,
      loadMore: loadMoreTx,
      error: errorTx,
    };
  }

  return {
    historyRecords,
    loading: loadingInvoice,
    refresh: refreshInvoice,
    hasMore: hasMoreInvoice,
    loadMore: loadMoreInvoice,
    error: errorInvoice
  };
};
