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

export const calcTime = (sec: number) => {
  sec = Number(sec);
  let h = Math.floor(sec / 3600);
  let m = Math.floor(sec % 3600 / 60);
  let s = Math.floor(sec % 3600 % 60);

  let hDisplay = h > 0 ? h + "h" : "";
  let mDisplay = m > 0 ? m + "m" : "";
  let sDisplay = s > 0 ? s + "s" : "";
  return hDisplay + mDisplay + sDisplay;
}

export const transferInvoiceContent = (domain: string, invoice: string ) => {
  const decodedInvoice = require('light-bolt11-decoder').decode(invoice).sections;
  const invoiceContent = {
    domain: domain,
    type: 'paid_invoice',
    network: decodedInvoice.find((item:any) => item.name === 'coin_network').value.bech32,
    amount: switchUnits(decodedInvoice.find((item:any) => item.name === 'amount').letters),
    expiry_time: calcTime(decodedInvoice.find((item:any) => item.name === 'expiry').value),
    description: decodedInvoice.find((item:any) => item.name === 'description').value,
  }
  const result = JSON.stringify(invoiceContent, null, 2)

  return result;
}
