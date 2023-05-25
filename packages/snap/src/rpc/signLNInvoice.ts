import {Snap, LNHdPath} from '../interface';
import {getHDNode} from '../utils/getHDNode';
import {transferInvoiceContent} from '../utils/transferLNData';
import bitcoinMessage from 'bitcoinjs-message';
import { RequestErrors, SnapError } from '../errors';
import { divider, heading, panel, text } from "@metamask/snaps-ui";

export async function signLNInvoice(
  domain: string,
  snap: Snap,
  invoice: string,
): Promise<string> {
  const invoiceContent = transferInvoiceContent(invoice);
  const result = await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'confirmation',
      content: panel([
        heading('Sign Lightning Transaction'),
        text(`Please verify this ongoing transaction from ${domain}`),
        divider(),
        panel(Object.entries(invoiceContent).map(([key, value]) => text(`**${key}**:\n ${value}`))),
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
