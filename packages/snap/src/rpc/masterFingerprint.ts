import { Wallet } from "../interface";
import { getPersistedData, updatePersistedData } from '../utils/manageState';

export async function masterFingerprint(wallet: Wallet, action: "get" | "clear"): Promise<string | void> {
  switch (action) {
    case "get":
      return getMasterFingerprint(wallet);
    case "clear":
      await updatePersistedData(wallet, "mfp", "");
      break;
    default:
      throw Error("Action not exist");
  }
}

export const updateMasterFingerprint = async (wallet: Wallet, mfp: string) => {
  await updatePersistedData(wallet, "mfp", mfp);
}

export const getMasterFingerprint = async (wallet: Wallet): Promise<string> => {
  return getPersistedData(wallet, "mfp", "");
}
