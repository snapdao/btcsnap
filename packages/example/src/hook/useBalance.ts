import { useCallback, useEffect, useState } from 'react';
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
    runtime: { setStatus, getWallet, setBalanceForWallet },
    lightning,
  } = useAppStore();
  const [count, setCount] = useState(0);
  const [balance, setBalance] = useState(0);
  const [loadingBalance, setLoadingBalance] = useState<boolean>(false);

  const refresh = () => {
    setCount(count + 1);
  };

  const fetchBalance = useCallback((forceFetch = false) => {
    const queryBalance = async (current: IAccount) => {
      const coinCode: SupportedCoins =
        NETWORK_SCRIPT_TO_COIN[current.network][current.scriptType];
      const response = await queryCoinV2();
      const balance = Number(response.coins[coinCode].balance) || 0;
      return { balance };
    };

    if(currentWalletType === WalletType.BitcoinWallet) {
      if (current) {
        const wallet = getWallet(current.id);
        if(wallet && wallet.balanceFetched && !forceFetch){
          setBalance(wallet.balance);
          setStatus(AppStatus.Ready);
          return;
        }

        !count && setStatus(AppStatus.FetchBalance);
        setLoadingBalance(true);
        queryBalance(current)
          .then(({ balance }) => {
            setBalance(balance);
            setLoadingBalance(false);
            setStatus(AppStatus.Ready);
            setBalanceForWallet(current.id, balance);
          })
          .catch((e) => {
            logger.error(e);
            setLoadingBalance(false);
            setStatus(AppStatus.Ready);
            setBalanceForWallet(current.id, balance);
          });
      } else {
        setBalance(0);
        setStatus(AppStatus.Ready);
      }
    } else if(currentWalletType === WalletType.LightningWallet) {
      if (lightning.current) {
        const currentLNWallet = lightning.current;
        const wallet = getWallet(currentLNWallet.id);
        if(wallet && wallet.balanceFetched && !forceFetch){
          setBalance(wallet.balance);
          setStatus(AppStatus.Ready);
          return;
        }

        queryLightningBalance().then(response => {
          const balance = Number(response.BTC.AvailableBalance) || 0;
          setBalance(balance);
          setBalanceForWallet(currentLNWallet.id, balance);
        }).catch(() => {
          setBalance(0);
          setStatus(AppStatus.Ready);
        });
      }
    }
  }, [currentWalletType, current, lightning.current]);

  useEffect(() => {
    fetchBalance();
  }, [current, currentWalletType, lightning.current]);

  useEffect(() => {
    fetchBalance(true);
  }, [count]);

  return {
    balance,
    refresh,
    loadingBalance,
  };
};
