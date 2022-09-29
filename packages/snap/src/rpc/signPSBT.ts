import { BitcoinNetwork, ScriptType, Wallet } from '../interface';
import { extractAccountPrivateKey } from './getExtendedPublicKey';
import { AccountSigner, BtcTx, getNetwork } from '../bitcoin/index';
import { getMasterFingerprint } from '../rpc/masterFingerprint';
import { getPersistedData } from '../utils/manageState';

export async function signPsbt(wallet: Wallet, psbt: string, network: BitcoinNetwork, scriptType: ScriptType): Promise<{ txId: string, txHex: string }> {
  const snapNetwork = await getPersistedData<BitcoinNetwork>(wallet, "network", '' as BitcoinNetwork);
  if(!snapNetwork){
    throw new Error('Network not match')
  }

  const btcTx = new BtcTx(psbt, snapNetwork);
  const result = await wallet.request({
    method: 'snap_confirm',
    params: [
      {
        prompt: 'Sign Bitcoin Transaction',
        description: 'Please verify this ongoing Transaction Detail',
        textAreaContent: btcTx.extractPsbtJsonString(),
      },
    ],
  });

  if (result) {
    const accountPrivateKey = await extractAccountPrivateKey(wallet, getNetwork(snapNetwork), scriptType)
    const mfp = Buffer.from(await getMasterFingerprint(wallet), "hex")
    const signer = new AccountSigner(accountPrivateKey, mfp)
    btcTx.validateTx(signer)
    return btcTx.signTx(signer)
  } else {
    throw new Error('user reject the sign request')
  }
}