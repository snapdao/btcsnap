import { useAppStore } from '../mobx';
import { useCallback, useEffect, useState } from 'react';
import { getBtc } from '../api/lightning/getBtc';
import { logger } from '../logger';
import { WalletType } from '../interface';

export const useTopUpAddress = () => {
  const { current, lightning: { current: lightningCurrent }, currentWalletType } = useAppStore();
  const [address, setAddress] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState('');
  const fetchAddress = useCallback(async () => {
    const result = await getBtc();
    if (!Array.isArray(result)) throw result;
    const resultFirst = result.at(0)?.address;
    return resultFirst;
  }, []);

  useEffect(() => {
    if (currentWalletType === WalletType.LightningWallet && !lightningCurrent) {
      setAddress('');
      return;
    }
    setLoading(true);
    setErrorMessage('');
    async function load() {
      try {
        const result = await fetchAddress();
        if (result) {
          setAddress(result);
        } else {
          setAddress('');
        }
        setLoading(false);
      } catch(e) {
        logger.error(e);
        setAddress('');
        setErrorMessage('Failed to get top up address, plase try again later.');
        setLoading(false);
      }
    }
    load();
  }, [current, lightningCurrent]);

  return {
    address,
    loading,
    errorMessage
  };
};
