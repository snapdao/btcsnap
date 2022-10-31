import { Wallet } from "../interface";
import { getPrivateKey } from "../utils/getPrivateKey";
import { switchUnits, calcTime } from "../utils/transferLNData";
import bitcoinMessage from 'bitcoinjs-message';

export async function signLNInvoice(domain: string, wallet: Wallet, invoice: string, hdPath: string ): Promise<string> {
  const decodedInvoice = require('light-bolt11-decoder').decode(invoice).sections;
  const invoiceContent = {
    domain: domain,
    type: 'paid_invoice',
    network: decodedInvoice.find((item:any) => item.name === 'coin_network').value.bech32,
    amount: switchUnits(decodedInvoice.find((item:any) => item.name === 'amount').letters),
    expiry_time: calcTime(decodedInvoice.find((item:any) => item.name === 'expiry').value),
    description: decodedInvoice.find((item:any) => item.name === 'description').value,
  }
  const testContent = JSON.stringify(invoiceContent, null, 2);

  const result = await wallet.request({
    method: 'snap_confirm',
    params: [
      {
        prompt: 'Sign Lightning Transaction',
        description: `Please verify this ongoing transaction from ${domain}`,
        textAreaContent: testContent,
      }
    ]
  });

  if(result) {
    const privateKey = await getPrivateKey(wallet, hdPath);
    const signature = bitcoinMessage.sign(invoice, privateKey, true).toString('base64');
    return signature;
  } else {
    throw new Error('User reject the sign request');
  }
}

