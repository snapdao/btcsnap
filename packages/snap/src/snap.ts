import {Wallet, ScriptType} from './interface'
import { getExtendedPublicKey } from './rpc/getExtendedPublicKey'

declare let wallet: Wallet;

wallet.registerRpcMessageHandler(async (originString, requestObject) => {
    switch (requestObject.method) {
      case 'btc_getPublicExtendedKey':
        return getExtendedPublicKey(wallet, ScriptType.P2PKH)
      default:
        throw new Error('Method not found.');
    }
  });
  