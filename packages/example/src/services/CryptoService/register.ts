import { getAppStore } from "../../mobx";
import { storeAccount } from "./storeAccount";
import { BitcoinNetwork, BitcoinScriptType } from "../../interface";
import { register as registerMFP } from "../../api";

export const register = async (xpub: string, mfp: string, scriptType: BitcoinScriptType, network: BitcoinNetwork) => {
  const appStore = getAppStore();
  try {
    const targetAccount = appStore.getAccount(xpub);
    if (targetAccount && targetAccount.hasSyncXPub) {
      appStore.switchAccount(targetAccount.xpub);
    } else {
      const registeredMfp = appStore.registeredMfp();

      const registerAnotherMFP = registeredMfp !== "" && registeredMfp !== mfp;
      if(registerAnotherMFP) {
        appStore.resetStore();
      }

      const MfpRegistered = registeredMfp === mfp;
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
