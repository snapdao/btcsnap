import { SLIP10Node, Wallet } from '../interface';
import { CRYPTO_CURVE, pathMap } from '../rpc/getExtendedPublicKey';

export async function getMasterFingerprint(wallet: Wallet): Promise<string | void> {
  const slip10Node = await wallet.request({
    method: "snap_getBip32Entropy",
    params: {
      path: pathMap.P2WPKH,
      curve: CRYPTO_CURVE
    },
  }) as SLIP10Node

  return slip10Node.masterFingerprint && slip10Node.masterFingerprint.toString(16)
}
