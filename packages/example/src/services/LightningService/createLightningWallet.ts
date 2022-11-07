import { generateLightningWalletId } from "../../mobx/utils";
import { BitcoinUnit } from "../../interface";
import { getAppStore } from "../../mobx";

export const createLightningWallet = (userId: string, name = '') => {
  const appStore = getAppStore();
  const { lightning } = appStore;

  const newWallet = lightning.createWallet({
    id: generateLightningWalletId(),
    userId,
    name: name || lightning.nextWalletName,
    unit: BitcoinUnit.Sats
  })

  lightning.applyWallet(newWallet)
}
