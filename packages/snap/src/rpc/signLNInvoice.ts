import {Snap, LNHdPath} from '../interface';
import {getHDNode} from '../utils/getHDNode';
import {transferInvoiceContent} from '../utils/transferLNData';
import bitcoinMessage from 'bitcoinjs-message';
import { RequestErrors, SnapError } from '../errors';

export async function signLNInvoice(
  domain: string,
  snap: Snap,
  invoice: string,
): Promise<string> {
  const textContent = transferInvoiceContent(invoice);
  const result = await snap.request({
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
    const privateKey = (await getHDNode(snap, LNHdPath)).privateKey;
    const signature = bitcoinMessage
      .sign(invoice, privateKey, true)
      .toString('hex');
    return signature;
  } else {
    throw SnapError.of(RequestErrors.RejectSign);
  }
}
