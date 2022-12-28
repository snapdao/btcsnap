import { LightningInvoicesResponse } from '../../api/lightning/invoices';
import { LightningTransaction } from '../../api/lightning/transactions';
import { InvoiceDetail, InvoiceStatus, InvoiceTypes } from '../../types';
import lightningPayReq from 'bolt11';
import { btcToSatoshi } from '../../lib/helper';
import { PendingTx } from '../../api/lightning/pendingTx';

export const transformInvoice = (invoice: LightningInvoicesResponse): InvoiceDetail => {
  const decodedInvoice = lightningPayReq.decode(
    invoice.paymentRequest,
  );
  const expireDateTime = new Date(
    (decodedInvoice?.timeExpireDate || 0) * 1000,
  );
  const isExpired =
    Math.floor(
      (expireDateTime.getTime() - new Date().getTime()) / 1000,
    ) <= 0;
  const status = invoice.ispaid
    ? InvoiceStatus.Succeed
    : isExpired
      ? InvoiceStatus.Expired
      : InvoiceStatus.Pending;

  return {
    ID: invoice.paymentHash,
    type: InvoiceTypes.Received,
    status,
    amount: invoice.amt,
    date: (invoice.timestamp || 0) * 1000,
    description: invoice.description,
    paymentRequest: invoice.paymentRequest
  };
};

export const transformTransaction = (transaction: LightningTransaction): InvoiceDetail | null => {
  if(transaction.type === 'paid_invoice'){
    return {
      ID: InvoiceTypes.Sent + transaction.timestamp,
      type: InvoiceTypes.Sent,
      status: InvoiceStatus.Succeed,
      amount: transaction.value,
      date: Number(transaction.timestamp || 0) * 1000,
      description: transaction.memo,
      fee: transaction.fee
    };
  }
  if(transaction.type === 'bitcoind_tx') {
    return {
      ID: InvoiceTypes.OnChain + transaction.time,
      type: InvoiceTypes.OnChain,
      status: InvoiceStatus.Succeed,
      amount: btcToSatoshi(transaction.amount),
      date: Number(transaction.time || 0) * 1000,
      address: transaction.address
    };
  }
  return null;
};

export const transformPendingTransaction = (transaction: PendingTx): InvoiceDetail => {
  return {
    ID: InvoiceTypes.OnChain + transaction.time,
    type: InvoiceTypes.OnChain,
    status: InvoiceStatus.Pending,
    amount: btcToSatoshi(transaction.amount),
    date: transaction.time * 1000,
  };
};
