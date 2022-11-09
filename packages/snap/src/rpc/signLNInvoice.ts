import {Wallet, LNHdPath} from '../interface';
import {getHDNode} from '../utils/getPrivateKey';
import {transferInvoiceContent} from '../utils/transferLNData';
import bitcoinMessage from 'bitcoinjs-message';

export async function signLNInvoice(
  domain: string,
  wallet: Wallet,
  invoice: string,
): Promise<string> {
  const textContent = transferInvoiceContent(domain, invoice);
  const result = await wallet.request({
    method: 'snap_confirm',
    params: [
      {
        prompt: 'Sign Lightning Transaction',
        description: `Please verify this ongoing transaction from ${domain}`,
        textAreaContent: textContent,
      },
    ],
  });

  if (result) {
    const privateKey = (await getHDNode(wallet, LNHdPath)).privateKey;
    const signature = bitcoinMessage
      .sign(invoice, privateKey, true)
      .toString('base64');
    return signature;
  } else {
    throw new Error('User reject the sign request');
  }
}
