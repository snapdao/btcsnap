import { Wallet, ScriptType, BIP44CoinTypeNode } from "../interface";
import { BtcTx } from "../bitcoin/index"


export async function signPsbt(wallet: Wallet, psbt: string): Promise<string> {
    const btcTx = new BtcTx(psbt)
    // validatePbst(psbt)
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

    console.log(result)

    return ""
}