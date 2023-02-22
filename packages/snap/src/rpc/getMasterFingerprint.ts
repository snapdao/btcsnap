import { SLIP10Node, Snap } from '../interface';
import { CRYPTO_CURVE, pathMap } from '../rpc/getExtendedPublicKey';

export async function getMasterFingerprint(snap: Snap): Promise<string | void> {
  const slip10Node = await snap.request({
    method: 'snap_getBip32Entropy',
    params: {
      path: pathMap.P2WPKH,
      curve: CRYPTO_CURVE
    },
  }) as SLIP10Node;

  return slip10Node.masterFingerprint && slip10Node.masterFingerprint.toString(16);
}
