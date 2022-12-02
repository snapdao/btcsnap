import { getAppStore } from '../../mobx';
import { storeAccount } from './storeAccount';
import { register as registerMFP } from '../../api';
import { logger } from '../../logger';
import { detectNetworkAndScriptType } from '../../lib';

export const register = async (xpubs: string[], mfp: string) => {
  const appStore = getAppStore();
  try {
    const registeredMfp = appStore.registeredMfp();
    const registerAnotherMFP = registeredMfp !== '' && registeredMfp !== mfp;
    if (registerAnotherMFP) {
      appStore.resetStore();
    }
    const MfpRegistered = registeredMfp === mfp;
    if (!MfpRegistered) {
      await registerMFP(mfp);
    }

    await Promise.all(xpubs.map(async xpub => {
      const targetAccount = appStore.getAccount(xpub);
      if (targetAccount && targetAccount.hasSyncXPub) {
        appStore.switchAccount(targetAccount.xpub);
      } else {
        const { scriptType, network } = detectNetworkAndScriptType(xpub);
        await storeAccount(xpub, mfp, scriptType, network);
      }
    }));
  } catch (e) {
    logger.error(e);
    throw e;
  }
};
