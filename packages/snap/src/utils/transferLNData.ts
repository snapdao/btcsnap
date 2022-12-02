import { btcToSatoshi } from './helpers';
export const switchUnits = (letters: string) => {
  const num = Number(letters.slice(0, letters.length - 1));
  const unit = letters.slice(letters.length - 1);
  const numLen = letters.slice(0, letters.length - 1).length - 1;

  switch(unit) {
    case "m":
      return (num * 0.001).toFixed(3 - numLen);
    case "u":
      return (num * 0.000001).toFixed(6 - numLen);
    case "n":
      return (num * 0.000000001).toFixed(9 - numLen);
    case "p":
      return (num * 0.000000000001).toFixed(12 - numLen);
    default:
      return letters;
  }
}

export const formatTime = (sec: number) => {
  const hours = Math.floor(sec / 3600);
  const minutes = Math.floor(sec % 3600 / 60);
  return `${hours}H ${minutes}M`;
}

const getBoltField = (invoice: Record<string, any>, key: string) => invoice.find((item:any) => item.name === key)

const formatInvoice = (invoice:string) => {
  const decodedInvoice = require('light-bolt11-decoder').decode(invoice).sections;
  const expireDatetime = getBoltField(decodedInvoice, 'timestamp').value + getBoltField(decodedInvoice, 'expiry').value;
  return {
    isMainnet: getBoltField(decodedInvoice, 'coin_network').value.bech32 === 'bc',
    amount: switchUnits(getBoltField(decodedInvoice, 'amount').letters),
    expireTime: expireDatetime - Math.floor(new Date().getTime() / 1000),
    description: getBoltField(decodedInvoice, 'description').value
  }
}

export const transferInvoiceContent = (domain: string, invoice: string ) => {
  const formattedInvoice = formatInvoice(invoice);

  const invoiceContent = {
    domain: domain,
    type: 'paid_invoice',
    network: `Lightning on Bitcoin ${formattedInvoice.isMainnet ? 'mainnet' : 'testnet'}`,
    amount: btcToSatoshi(Number(formattedInvoice.amount)) + 'sats',
    expiry_time: formatTime(formattedInvoice.expireTime),
    description: formattedInvoice.description,
  }
  return Object.entries(invoiceContent).map(([key, value]) => `${key}: ${value}\n`).join('')
}
