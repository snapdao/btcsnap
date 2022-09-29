import { Wallet } from "../interface";
import { sha256 } from "../bitcoin/crypto";
import { getPersistedData, updatePersistedData } from '../utils/manageState';

export async function getOrUpdateMFP(wallet: Wallet, xpub: string): Promise<string> {
  const mfp = await getMasterFingerprint(wallet);

  if (mfp) {
    return mfp;
  }

  if (xpub) {
    const hashBuffer = sha256(Buffer.from(xpub));
    const mfp = hashBuffer.toString("hex").slice(0, 8);

    await updatePersistedData(wallet, "mfp", mfp);
    return mfp;
  }
  return mfp;
}

export async function masterFingerprint(wallet: Wallet, action: "get" | "clear"): Promise<string | void> {
  switch (action) {
    case "get":
      return getMasterFingerprint(wallet);
    case "clear":
      await updatePersistedData(wallet, "mfp", "");
      break;
    default:
      return getMasterFingerprint(wallet);
  }
}

export async function getMasterFingerprint(wallet: Wallet): Promise<string> {
  return getPersistedData(wallet, "mfp", "");
}
