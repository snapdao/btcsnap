import {Snap, LNHdPath} from '../interface';
import {getHDNode} from '../utils/getHDNode';
import {transferInvoiceContent} from '../utils/transferLNData';
import bitcoinMessage from 'bitcoinjs-message';
import { RequestErrors, SnapError } from '../errors';
import { heading, panel, text } from "@metamask/snaps-ui";

export async function signLNInvoice(
  domain: string,
  snap: Snap,
  invoice: string,
): Promise<string> {
  const textContent = transferInvoiceContent(invoice);
  const result = await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'Confirmation',
      content: panel([
        heading('Sign Lightning Transaction'),
        text(`Please verify this ongoing transaction from ${domain}`),
        text(textContent),
      ]),
    },
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
