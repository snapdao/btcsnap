import { ScriptType, Wallet } from "../interface";
import { Network } from "bitcoinjs-lib"; 
import { extractAccountPrivateKey } from './getExtendedPublicKey'
import { BtcTx, AccountSigner } from "../bitcoin/index"


export async function signPsbt(wallet: Wallet, psbt: string, network: Network, scriptType: ScriptType): Promise<{ txId: string, txHex: string }> {
  const btcTx = new BtcTx(psbt)
  const result = await wallet.request({
    method: 'snap_confirm',
    params: [
      {
        prompt: 'Sign Bitcion Transaction?',
        description: 'Please verify this ongoing Transaction Detail',
        textAreaContent: btcTx.extractPsbtJsonString(),
      },
    ],
  });

  if (result) {
    const accountPrivateKey = await extractAccountPrivateKey(wallet, network, scriptType)
    const signer = new AccountSigner(accountPrivateKey)
    btcTx.validateTx(signer)
    return btcTx.signTx(signer)
  } else {
    throw new Error('user reject the sign request')
  }
}