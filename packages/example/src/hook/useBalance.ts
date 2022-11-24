import { useEffect, useState } from 'react';
import { useAppStore } from '../mobx';
import { AppStatus } from '../mobx/runtime';
import { SupportedCoins } from '../constant/supportedCoins';
import { NETWORK_SCRIPT_TO_COIN } from '../constant/bitcoin';
import { queryCoinV2 } from '../api';
import { IAccount } from '../mobx/types';
import { logger } from '../logger';
import { WalletType } from '../interface';
import { balance as queryLightningBalance } from '../api/lightning/balance';

export const useBalance = () => {
  const {
    current,
    currentWalletType,
    runtime: { setStatus },
    lightning,
  } = useAppStore();
  const [count, setCount] = useState(0);
  const [balance, setBalance] = useState(0);
  const [loadingBalance, setLoadingBalance] = useState<boolean>(false);

  const refresh = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    const queryBalance = async (current: IAccount) => {
      const coinCode: SupportedCoins =
        NETWORK_SCRIPT_TO_COIN[current.network][current.scriptType];
      const response = await queryCoinV2();
      const balance = Number(response.coins[coinCode].balance) || 0;
      return { balance };
    };

    if(currentWalletType === WalletType.BitcoinWallet) {
      if (current) {
        !count && setStatus(AppStatus.FetchBalance);
        setLoadingBalance(true);
        queryBalance(current)
          .then(({ balance }) => {
            setBalance(balance);
            setStatus(AppStatus.Ready);
            setLoadingBalance(false);
          })
          .catch((e) => {
            logger.error(e);
            setStatus(AppStatus.Ready);
            setLoadingBalance(false);
          });
      } else {
        setBalance(0);
        setStatus(AppStatus.Ready);
      }
    } else {
      if (lightning.current) {
        queryLightningBalance().then(response => {
          setBalance(Number(response.BTC.AvailableBalance) || 0);
          setStatus(AppStatus.Ready);
        }).catch(() => {
          setBalance(0);
          setStatus(AppStatus.Ready);
        });
      }
    }
  }, [current, currentWalletType, count, lightning.current]);

  return {
    balance,
    refresh,
    loadingBalance,
  };
};
