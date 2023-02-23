import { hrpToSatoshi } from './unitHelper';

export const formatTime = (sec: number) => {
  const hours = Math.floor(sec / 3600);
  const minutes = Math.floor(sec % 3600 / 60);
  if (hours <= 0 && minutes <= 0) {
    return 'Expired';
  }
  return `${hours}H ${minutes}M`;
};

const getBoltField = (invoice: Record<string, any>, key: string) => invoice.find((item:any) => item.name === key);

const formatInvoice = (invoice:string) => {
  const decodedInvoice = require('light-bolt11-decoder').decode(invoice).sections;
  const expireDatetime = getBoltField(decodedInvoice, 'timestamp').value + getBoltField(decodedInvoice, 'expiry').value;
  return {
    isMainnet: getBoltField(decodedInvoice, 'coin_network').value.bech32 === 'bc',
    amount: hrpToSatoshi(getBoltField(decodedInvoice, 'amount').letters),
    expireTime: expireDatetime - Math.floor(new Date().getTime() / 1000),
    description: getBoltField(decodedInvoice, 'description').value
  };
};

export const transferInvoiceContent = (invoice: string) => {
  const formattedInvoice = formatInvoice(invoice);
  return {
    network: `Lightning on Bitcoin ${formattedInvoice.isMainnet ? 'mainnet' : 'testnet'}`,
    type: 'send',
    amount: formattedInvoice.amount + ' sats',
    expired_in: formatTime(formattedInvoice.expireTime),
    description: formattedInvoice.description,
  };
};
