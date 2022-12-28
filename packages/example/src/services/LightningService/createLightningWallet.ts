import { generateLightningWalletId } from '../../mobx/utils';
import { BitcoinUnit } from '../../interface';
import { getAppStore } from '../../mobx';
import { saveLNDataToSnap } from '../../lib/snap';

export const createLightningWallet = (userId: string, name: string) => {
  const appStore = getAppStore();
  const { lightning } = appStore;

  const newWallet = lightning.createWallet({
    id: generateLightningWalletId(),
    userId,
    name,
    unit: BitcoinUnit.Sats,
  });

  lightning.applyWallet(newWallet);
};

export const createLNWallet = async (userId: string, userPassword: string, credential: { login: string, password: string}, name = '') => {
  const appStore = getAppStore();
  const { lightning } = appStore;

  const newWallet = lightning.createWallet({
    id: generateLightningWalletId(),
    userId,
    name: name || lightning.nextWalletName,
    unit: BitcoinUnit.Sats,
  });

  await saveLNDataToSnap({
    walletId: userId,
    credential: `${credential.login}:${credential.password}`,
    password: userPassword
  });

  return newWallet;
};
