import { useAppStore } from '../mobx';
import { useCallback, useEffect, useState } from 'react';
import { getBtc } from '../api/v1/getBtc';
import { logger } from '../logger';
import { getPassword } from '../services/LightningService/getUserInfo';

export const useTopUpAddress = () => {
  const { current, lightning: { current: lightningCurrent } } = useAppStore();
  const [address, setAddress] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const fetchAddress = useCallback(async () => {
    try {
      if (!lightningCurrent?.userId) return '';
      const password = await getPassword(lightningCurrent.userId);
      if (!password) return '';
      const result = await getBtc({ id: lightningCurrent.userId, password });
      if (!Array.isArray(result)) throw result;
      const resultFirst = result.at(0)?.address;
      return resultFirst;
    } catch (e) {
      logger.error(e);
      setLoading(false);
      return '';
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    async function load() {
      const result = await fetchAddress();
      if (result) {
        setAddress(result);
      }
      setLoading(false);
    }
    load();
  }, [current, lightningCurrent]);

  return {
    address,
    loading
  };
};
