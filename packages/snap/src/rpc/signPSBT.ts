import { BitcoinNetwork, ScriptType, Wallet } from '../interface';
import { extractAccountPrivateKey } from './getExtendedPublicKey';
import { AccountSigner, BtcTx } from '../bitcoin';
import { getPersistedData } from '../utils/manageState';
import { getNetwork } from '../bitcoin/getNetwork';

export async function signPsbt(domain: string, wallet: Wallet, psbt: string, network: BitcoinNetwork, scriptType: ScriptType): Promise<{ txId: string, txHex: string }> {
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
        description: `Please verify this ongoing Transaction from ${domain}`,
        textAreaContent: btcTx.extractPsbtJsonString(),
      },
    ],
  });

  if (result) {
    const {node: accountPrivateKey, mfp} = await extractAccountPrivateKey(wallet, getNetwork(snapNetwork), scriptType)
    const signer = new AccountSigner(accountPrivateKey, Buffer.from(mfp, 'hex'));
    btcTx.validateTx(signer)
    return btcTx.signTx(signer)
  } else {
    throw new Error('User reject the sign request')
  }
}
