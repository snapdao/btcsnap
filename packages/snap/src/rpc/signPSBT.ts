import { BitcoinNetwork, ScriptType, Snap } from '../interface';
import { extractAccountPrivateKey } from './getExtendedPublicKey';
import { AccountSigner, BtcTx } from '../bitcoin';
import { getPersistedData } from '../utils/manageState';
import { getNetwork } from '../bitcoin/getNetwork';
import { SnapError, RequestErrors } from "../errors";

export async function signPsbt(domain: string, snap: Snap, psbt: string, network: BitcoinNetwork, scriptType: ScriptType): Promise<{ txId: string, txHex: string }> {
  const snapNetwork = await getPersistedData<BitcoinNetwork>(snap, "network", '' as BitcoinNetwork);
  if(!snapNetwork){
    throw SnapError.of(RequestErrors.NetworkNotMatch);
  }

  const btcTx = new BtcTx(psbt, snapNetwork);
  const result = await snap.request({
    method: 'snap_confirm',
    params: [
      {
        prompt: 'Sign Bitcoin Transaction',
        description: `Please verify this ongoing Transaction from ${domain}`,
        textAreaContent: btcTx.extractPsbtJsonString(),
      },
    ],
  });

  if (result) {
    const {node: accountPrivateKey, mfp} = await extractAccountPrivateKey(snap, getNetwork(snapNetwork), scriptType)
    const signer = new AccountSigner(accountPrivateKey, Buffer.from(mfp, 'hex'));
    btcTx.validateTx(signer)
    return btcTx.signTx(signer)
  } else {
    throw SnapError.of(RequestErrors.RejectSign);
  }
}
