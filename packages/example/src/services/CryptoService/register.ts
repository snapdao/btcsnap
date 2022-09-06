import { getKeystoneStore } from "../../mobx";
import { storeAccount } from "./storeAccount";
import { BitcoinNetwork, BitcoinScriptType } from "../../interface";
import { register as registerMFP } from "../../api";

export const register = async (xpub: string, mfp: string, scriptType: BitcoinScriptType, network: BitcoinNetwork) => {
  const keystoneStore = getKeystoneStore();
  try {
    const targetAccount = keystoneStore.getAccount(xpub);
    if (targetAccount) {
      keystoneStore.switchAccount(targetAccount.xpub);
    } else {
      const targetMFP = keystoneStore.getAccount(mfp);
      const MfpRegistered = !!targetMFP;

      if (!MfpRegistered) {
        await registerMFP(mfp);
      }
      await storeAccount(xpub, mfp, scriptType, network)
    }
  } catch (e) {
    console.error("Register error", e)
    throw e;
  }
};
