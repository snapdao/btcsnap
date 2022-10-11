import { useEffect, useState } from 'react';
import { useKeystoneStore } from "../mobx";
import { AppStatus } from "../mobx/runtime";
import { SupportedCoins } from "../constant/supportedCoins";
import { NETWORK_SCRIPT_TO_COIN } from "../constant/bitcoin";
import { queryCoinV2 } from "../api";
import { queryCoinV1 } from "../api/v1/coin";
import { IAccount } from '../mobx/types';

export const useBalance = () => {
  const {current, runtime: {setStatus}} = useKeystoneStore();
  const [count, setCount] = useState(0);
  const [balance, setBalance] = useState(0);
  const [rate, setRate] = useState(0);

  const refresh = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    const queryBalance = async (current: IAccount) => {
      const coinCode: SupportedCoins = NETWORK_SCRIPT_TO_COIN[current.network][current.scriptType];
      try {
        const values = await Promise.all([queryCoinV1(coinCode), queryCoinV2()]);
        const [v1Res, v2Res] = values;
        const rate = Number(v1Res.coins?.[coinCode]?.coinInfo?.rate) || 0;
        const balance = Number(v2Res.coins[coinCode].balance) || 0;
        return {balance, rate};
      } catch (e) {
        throw e;
      }
    }

    if (current) {
      if(count === 0) {
        setStatus(AppStatus.FetchBalance);
      }
      queryBalance(current)
        .then(({balance, rate}) => {
          setBalance(balance);
          setRate(rate);
          setStatus(AppStatus.Ready);
        })
        .catch((e) => {
          console.error("Fetch balance failed", e);
          setStatus(AppStatus.Ready);
        });
    } else {
      setBalance(0);
    }
  }, [current, count]);

  return {
    balance,
    rate,
    refresh,
  };
};
