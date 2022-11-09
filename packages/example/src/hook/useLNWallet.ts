import { useState } from 'react';
import { useAppStore } from '../mobx';
import {
  createWallet,
  CreateWalletResponse,
} from '../api/lightning/createWallet';
import { getLNWalletData, KeyOptions, saveLNDataToSnap } from '../lib/snap';
import { createLightningWallet } from '../services/LightningService/createLightningWallet';

export const useLNWallet = () => {
  const {
    lightning: { nextWalletName },
  } = useAppStore();
  const [wallet, setWallet] = useState<CreateWalletResponse>();
  const [createLoading, setCreateLoading] = useState(false);

  async function create(name: string) {
    setCreateLoading(true);
    const pubkey = await getLNWalletData(KeyOptions.PubKey);
    if (!pubkey) {
      console.error('pubkey not found');
      return;
    }
    const createRes = await createWallet(pubkey);
    const credential = createRes.credential;
    if (!credential) return;
    setWallet(createRes);

    createLightningWallet(createRes.userId, name || nextWalletName);
    await saveLNDataToSnap({
      walletId: createRes.userId,
      credential: `${credential.login}:${credential.password}`,
      password: createRes.userPassword,
    });
    setCreateLoading(false);
    return true;
  }

  return { createLoading, create, wallet };
};
