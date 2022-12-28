import { trackLightningAddSuccess } from './../tracking/events/index';
import { useState } from 'react';
import { useAppStore } from '../mobx';
import {
  createWallet,
  CreateWalletResponse,
} from '../api/lightning/createWallet';
import {
  getLNWalletData,
  GetLNWalletDataKey,
  saveLNDataToSnap,
} from '../lib/snap';
import { createLightningWallet } from '../services/LightningService/createLightningWallet';

export const useLNWallet = () => {
  const {
    lightning: { nextWalletName },
  } = useAppStore();
  const [wallet, setWallet] = useState<CreateWalletResponse>();
  const [createLoading, setCreateLoading] = useState(false);

  async function create(name: string) {
    try {
      setCreateLoading(true);
      const pubkey = await getLNWalletData(GetLNWalletDataKey.PubKey);
      if (!pubkey) {
        console.error('pubkey not found');
        return;
      }
      const createRes = await createWallet(pubkey);
      const credential = createRes.credential;
      if (!credential && !createRes.success) {
        if (createRes.error_message) {
          console.error('create error', createRes.error_message);
        }
        return;
      }
      await saveLNDataToSnap({
        walletId: createRes.userId,
        credential: `${credential.login}:${credential.password}`,
        password: createRes.userPassword,
      });

      setWallet(createRes);

      createLightningWallet(createRes.userId, name || nextWalletName);

      trackLightningAddSuccess();

      setCreateLoading(false);
      return true;
    } catch (e) {
      setCreateLoading(false);
      throw e;
    }
  }

  return { createLoading, create, wallet };
};
