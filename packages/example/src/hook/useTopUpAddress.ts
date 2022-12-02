import { useAppStore } from '../mobx';
import { useCallback, useEffect, useState } from 'react';
import { getBtc } from '../api/lightning/getBtc';
import { logger } from '../logger';

export const useTopUpAddress = () => {
  const { current, lightning: { current: lightningCurrent } } = useAppStore();
  const [address, setAddress] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const fetchAddress = useCallback(async () => {
    try {
      const result = await getBtc();
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
    if (!lightningCurrent) {
      setAddress('');
      return;
    }
    setLoading(true);
    async function load() {
      const result = await fetchAddress();
      if (result) {
        setAddress(result);
      } else {
        setAddress('');
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
