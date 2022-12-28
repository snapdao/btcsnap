import { ReactNode } from 'react';
import dayjs from 'dayjs';
import { Icon, TransactionInfoProps } from 'snapkit';
import { HistoryRecord, HistoryRecordType, InvoiceStatus, InvoiceTypes, TransactionTypes } from '../../../types';
import { DefaultTitle, ExpiredTitle, NotReceivedAmount, ReceiveAmount, SendAmount, TopUpAmount } from './styles';

const getRecordIcon = (record: HistoryRecord) => {
  if (record.type === HistoryRecordType.LightningInvoice && record.data.status === InvoiceStatus.Expired) {
    return <Icon.Expired color={'#656D85'}/>;
  }
  if (record.data.type === TransactionTypes.Sent || record.data.type === InvoiceTypes.Sent) {
    return <Icon.Send color={'#F54814'}/>;
  }
  if (record.data.type === TransactionTypes.Received || record.data.type === InvoiceTypes.Received) {
    return <Icon.Receive color={'#21A35D'}/>;
  }
  if (record.data.type === InvoiceTypes.OnChain) {
    return <Icon.OnChain color={'#1F69FF'}/>;
  }
  return <Icon.OnChain/>;
};

const titleTransform = (record: HistoryRecord) => {
  let TitleWrapper = DefaultTitle;
  if (record.type === HistoryRecordType.LightningInvoice && record.data.status === InvoiceStatus.Expired) {
    TitleWrapper = ExpiredTitle;
  }
  return <TitleWrapper>{record.title}</TitleWrapper>;
};

const amountTransform = (record: HistoryRecord): ReactNode => {
  const isReceive = (record.data.type === TransactionTypes.Received || record.data.type === InvoiceTypes.Received || record.data.type === InvoiceTypes.OnChain);
  const amountText = `${isReceive ? '+' : '-'}${record.amount}`;
  let AmountWrapper = record.amount > 0 ? ReceiveAmount : SendAmount;

  if (record.type === HistoryRecordType.LightningInvoice) {
    if (record.data.type === InvoiceTypes.OnChain) {
      AmountWrapper = TopUpAmount;
    }
    if (record.data.status === InvoiceStatus.Pending || record.data.status === InvoiceStatus.Expired) {
      AmountWrapper = NotReceivedAmount;
    }
  }
  return <AmountWrapper as='span'>{amountText}</AmountWrapper>;
};

export const recordToRecordCard = (record: HistoryRecord): TransactionInfoProps => {
  return {
    icon: getRecordIcon(record),
    iconLoading: record.loading,
    title: titleTransform(record),
    amount: amountTransform(record),
    label: record.label,
    content: record.content,
    datetime: dayjs(record.datetime).format('MM-DD HH:mm')
  };
};
