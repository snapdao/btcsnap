import {Wallet, ScriptType} from './interface'
import { getExtendedPublicKey, signPsbt} from './rpc'

declare let wallet: Wallet;

wallet.registerRpcMessageHandler(async (originString, requestObject) => {
    switch (requestObject.method) {
      case 'btc_getPublicExtendedKey':
        return getExtendedPublicKey(wallet, ScriptType.P2PKH)
      case 'btc_signPsbt':
        const psbt = requestObject.params.psbt;
        return signPsbt(wallet, psbt)
      default:
        throw new Error('Method not found.');
    }
  });
  