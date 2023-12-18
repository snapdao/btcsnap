import { BitcoinNetwork, ScriptType, SignPsbtOptions, Snap } from '../interface';
import { extractAccountPrivateKey } from './getExtendedPublicKey';
import { AccountSigner, BtcPsbt } from '../bitcoin';
import { getPersistedData } from '../utils/manageState';
import { getNetwork } from '../bitcoin/getNetwork';
import { SnapError, RequestErrors } from "../errors";
import { heading, panel, text, divider } from "@metamask/snaps-ui";

export async function signPsbt(
  domain: string,
  snap: Snap,
  psbt: string,
  network: BitcoinNetwork,
  scriptType: ScriptType,
  opts?: SignPsbtOptions
): Promise<{ txId: string, txHex: string }> {
  const snapNetwork = await getPersistedData<BitcoinNetwork>(snap, "network", '' as BitcoinNetwork);
  if (snapNetwork != network) {
    throw SnapError.of(RequestErrors.NetworkNotMatch);
  }

  const btcPsbt = new BtcPsbt(psbt, snapNetwork);
  const txDetails = btcPsbt.extractPsbtJson()

  const result = await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'confirmation',
      content: panel([
        heading('Sign Bitcoin Transaction'),
        text(`Please verify this ongoing Transaction from ${domain}`),
        divider(),
        panel(Object.entries(txDetails).map(([key, value]) => text(`**${key}**:\n ${value}`))),
      ]),
    },
  });

  if (result) {
    const { node: accountPrivateKey, mfp } = await extractAccountPrivateKey(snap, getNetwork(snapNetwork), scriptType)
    const signer = new AccountSigner(accountPrivateKey, Buffer.from(mfp, 'hex'));
    btcPsbt.validatePsbt(signer);
    return btcPsbt.signPsbt(signer, opts);
  } else {
    throw SnapError.of(RequestErrors.RejectSign);
  }
}