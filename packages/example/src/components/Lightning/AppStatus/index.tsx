import { useEffect, useState } from 'react';
import { refreshToken } from '../../../api/lightning/refreshToken';
import { Message, MessageType } from '../../../kits';
import { getLNWalletData, GetLNWalletDataKey, saveLNDataToSnap } from '../../../lib/snap';
import { useAppStore } from '../../../mobx';
import { LightningAppStatus as LightningAppStatusEnum } from '../../../mobx/runtime';
import LightningAppStatusExpired from './Expired';

const LightningAppStatus = () => {
  const {
    lightning: { current },
    runtime: { lightningAppStatus, setLightningAppStatus }
  } = useAppStore();
  const [errorMessage, setErrorMessage] = useState('');

  async function getCredential() {
    try {
      if (current) {
        const userId = current?.userId;
        const credential = await getLNWalletData(GetLNWalletDataKey.Credential, userId);
        if (!credential) throw new Error('Credential is empty.');
        const refreshTokenResponse = await refreshToken();
        console.log('%c Line:23 🍧 refreshTokenResponse', 'color:#4fff4B', refreshTokenResponse);
        const userPassword = await getLNWalletData(GetLNWalletDataKey.Password, userId);
        if (!userPassword) throw new Error('userPassword is empty.');

        await saveLNDataToSnap({
          walletId: userId,
          credential,
          password: userPassword
        });
        setLightningAppStatus(LightningAppStatusEnum.Ready);
      } else {
        setLightningAppStatus(LightningAppStatusEnum.Ready);
      }
    } catch(e: any) {
      setLightningAppStatus(LightningAppStatusEnum.Ready);
      setErrorMessage(e.message || 'credential get failed');
    }
  }

  useEffect(() => {
    if (lightningAppStatus === LightningAppStatusEnum.Expired) {
      getCredential();
    }
  }, [lightningAppStatus]);

  return <>
    {lightningAppStatus === LightningAppStatusEnum.Expired ? <LightningAppStatusExpired /> : null}
    {errorMessage && <Message type={MessageType.Error} onClose={() => setErrorMessage('')}>{errorMessage}</Message>}
  </>;
};

export default LightningAppStatus;
