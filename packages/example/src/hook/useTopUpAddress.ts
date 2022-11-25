import { useAppStore } from '../mobx';
import { useCallback, useEffect, useState } from 'react';
import { getBtc } from '../api/v1/getBtc';
import { logger } from '../logger';
import { getPassword } from '../services/LightningService/getUserInfo';
import { useReceiveAddress } from './useReceiveAddress';
import { WalletType } from '../interface';

export const useTopUpAddress = () => {
  const { current, lightning: { current: lightningCurrent }, currentWalletType } = useAppStore();
  const [address, setAddress] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { address: btcAddress, loading: btcLoading } = useReceiveAddress();
  const fetchAddress = useCallback(async () => {
    try {
      if (currentWalletType === WalletType.LightningWallet) {
        if (!lightningCurrent?.userId) return '';
        const password = await getPassword(lightningCurrent.userId);
        if (!password) return '';
        const result = await getBtc({ id: lightningCurrent.userId, password });
        if (!Array.isArray(result)) throw result;
        const resultFirst = result.at(0)?.address;
        return resultFirst;
      }
    } catch (e) {
      logger.error(e);
      setLoading(false);
      return '';
    }
  }, [currentWalletType]);

  useEffect(() => {
    setLoading(true);
    async function load() {
      const result = await fetchAddress();
      if (result) {
        setAddress(result);
      } else {
        setAddress(btcAddress);
      }
      setLoading(false);
    }
    load();
  }, [current, btcAddress, lightningCurrent]);

  return {
    address,
    loading: {
      [WalletType.BitcoinWallet]: btcLoading,
      [WalletType.LightningWallet]: loading
    }[currentWalletType]
  };
};
