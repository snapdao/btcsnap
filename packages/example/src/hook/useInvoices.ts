import { useEffect, useState } from 'react';
import { useAppStore } from '../mobx';
import { logger } from '../logger';
import { WalletType } from '../interface';
import { invoices as queryLightningInvoices } from '../api/lightning/invoices';
import { lightningTxs } from '../api/lightning/transactions';
import { InvoiceDetail } from '../types';
import { transformInvoice, transformPendingTransaction, transformTransaction } from '../services/LightningService/transform';
import { pendingTx as queryPendingTx } from '../api/lightning/pendingTx';

interface UseInvoices {
  size: number;
  offset?: number;
}

export const useInvoices = ({ size, offset = 0 }: UseInvoices) => {
  const { currentWalletType, lightning } = useAppStore();
  const [allTransactions, setAllTransactions] = useState<InvoiceDetail[]>([]);
  const [invoices, setInvoices] = useState<InvoiceDetail[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [startOffset, setStartOffset] = useState<number>(0);
  const [error, setError] = useState<string>();
  const endOffset = startOffset === 0 ? offset + size : startOffset + size;

  useEffect(() => {
    const fetchAllTransactions = async (): Promise<InvoiceDetail[]> => {
      const response = await Promise.all([
        queryLightningInvoices(),
        lightningTxs(),
        queryPendingTx()
      ]);
      const [invoices, txs, pendingTx] = response;

      return [
        ...invoices.map(transformInvoice),
        ...(txs.map(transformTransaction).filter(tx => tx !== null) as InvoiceDetail[]),
        ...pendingTx.map(transformPendingTransaction)
      ].sort((tx1, tx2) => tx2!.date - tx1!.date);
    };

    if (currentWalletType === WalletType.LightningWallet && lightning.current) {
      setLoading(true);
      fetchAllTransactions()
        .then(allTxs => {
          setAllTransactions(allTxs);
          setLoading(false);
        })
        .catch((e) => {
          setAllTransactions([]);
          setLoading(false);
          setError(e);
          logger.error(e);
        });
    } else {
      setAllTransactions([]);
    }
  }, [lightning.current, count, currentWalletType]);

  const refresh = () => {
    setError(undefined);
    if (!loading) {
      setCount(count + 1);
    }
  };

  const loadMore = () => {
    setStartOffset(endOffset);
  };

  useEffect(() => {
    if (allTransactions.length > 0) {
      const targetInvoices = allTransactions.slice(startOffset, endOffset);
      setHasMore(targetInvoices.length > 0);
      setInvoices(targetInvoices);
    } else {
      setInvoices([]);
    }
  }, [allTransactions, startOffset, size]);


  return {
    invoices,
    loading,
    refresh,
    hasMore,
    loadMore,
    error
  };
};
