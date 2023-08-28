import { useEffect, useState } from 'react';
import { useAppStore } from '../mobx';
import { SupportedCoins } from '../constant/supportedCoins';
import { NETWORK_SCRIPT_TO_COIN } from '../constant/bitcoin';
import { IAccount } from '../mobx/types';
import { logger } from '../logger';
import { queryAssetRate } from '../api';

export const useCurrencyRate = () => {
  const {
    current,
    runtime: { setCurrencyRate },
  } = useAppStore();
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);

  const refresh = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    const queryCurrencyRate = async (current: IAccount) => {
      const coinCode: SupportedCoins =
        NETWORK_SCRIPT_TO_COIN[current.network][current.scriptType];
      const response = await queryAssetRate();
      const rate = Number(response.rates.find(coinRate => coinRate.coin === coinCode)?.rate) || 0;
      return { rate };
    };

    if (current) {
      setLoading(true);
      queryCurrencyRate(current)
        .then(({ rate }) => {
          setCurrencyRate(rate);
          setLoading(false);
        })
        .catch((e) => {
          logger.error(e);
          setLoading(false);
        });
    }
  }, [!!current, count]);

  return {
    refreshCurrencyRate: refresh,
    loading,
  };
};
