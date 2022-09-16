import { getKeystoneStore } from "../../mobx";
import { storeAccount } from "./storeAccount";
import { BitcoinNetwork, BitcoinScriptType } from "../../interface";
import { register as registerMFP } from "../../api";

export const register = async (xpub: string, mfp: string, scriptType: BitcoinScriptType, network: BitcoinNetwork) => {
  const keystoneStore = getKeystoneStore();
  try {
    const targetAccount = keystoneStore.getAccount(xpub);
    if (targetAccount && targetAccount.hasSyncXPub) {
      keystoneStore.switchAccount(targetAccount.xpub);
    } else {
      const registeredMfp = keystoneStore.registeredMfp();

      const registerAnotherMFP = registeredMfp !== "" && registeredMfp !== mfp;
      if(registerAnotherMFP) {
        keystoneStore.resetStore();
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
