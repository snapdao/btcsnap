import { useEffect } from 'react';
import { useAppStore } from '../mobx';
import { SupportedCoins } from '../constant/supportedCoins';
import { NETWORK_SCRIPT_TO_COIN } from '../constant/bitcoin';
import { queryCoinV2 } from '../api';
import { IAccount } from '../mobx/types';
import { logger } from '../logger';
import { balance as queryLightningBalance } from '../api/lightning/balance';
import { WalletType } from '../interface';

const queryBitcoinBalance = async (current: IAccount) => {
  const coinCode: SupportedCoins =
    NETWORK_SCRIPT_TO_COIN[current.network][current.scriptType];
  const response = await queryCoinV2();
  const balance = Number(response.coins[coinCode].balance) || 0;
  return { balance };
};

export const useWalletsBalance = () => {
  const {
    current,
    lightning,
    runtime: { getWallet, setBalanceForWallet },
    currentWalletType,
    persistDataLoaded
  } = useAppStore();

  const fetchBitcoinWalletBalance = () => {
    if (current) {
      if (currentWalletType === WalletType.BitcoinWallet) {
        return;
      }
      const wallet = getWallet(current.id);
      if (wallet && wallet.balanceFetched) {
        return;
      }
      queryBitcoinBalance(current)
        .then(({ balance }) => {
          setBalanceForWallet(current.id, balance);
        })
        .catch((e) => {
          logger.error(e);
          setBalanceForWallet(current.id, 0);
        });
    }
  };

  const fetchAllLightningWalletsBalance = () => {
    lightning.wallets.forEach(lnWallet => {
      if (currentWalletType === WalletType.LightningWallet && lnWallet.userId === lightning.current?.userId) {
        return;
      }
      const wallet = getWallet(lnWallet.id);
      if (wallet?.balanceFetched) {
        return;
      }

      queryLightningBalance(lnWallet.userId).then(response => {
        const balance = Number(response.BTC.AvailableBalance) || 0;
        setBalanceForWallet(lnWallet.id, balance);
      }).catch(() => {
        setBalanceForWallet(lnWallet.id, 0);
      });
    });
  };

  useEffect(() => {
    if (persistDataLoaded) {
      fetchBitcoinWalletBalance();
      fetchAllLightningWalletsBalance();
    }
  }, [persistDataLoaded]);
};
