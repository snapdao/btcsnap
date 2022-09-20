import { PersistedData, Wallet } from "../interface";
import { sha256 } from "../bitcoin/crypto";

export async function getOrUpdateMFP(wallet: Wallet, xpub: string): Promise<string> {
  const mfp = await getMasterFingerprint(wallet);

  if (mfp) {
    return mfp;
  }

  if (xpub) {
    const hashBuffer = sha256(Buffer.from(xpub));
    const mfp = hashBuffer.toString("hex").slice(0, 8);

    await wallet.request({
      method: 'snap_manageState',
      params: ['update', {mfp}],
    });
    return mfp;
  }
  return mfp;
}

export async function getMasterFingerprint(wallet: Wallet): Promise<string> {
  const persistedData = await wallet.request<PersistedData>({
    method: 'snap_manageState',
    params: ['get'],
  });
  if (persistedData && persistedData.mfp) {
    return persistedData.mfp;
  }
  return "";
}
