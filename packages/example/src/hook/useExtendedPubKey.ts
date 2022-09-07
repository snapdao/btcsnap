import { useEffect, useState } from 'react';
import { Address, Utxo } from '../interface';
import { useKeystoneStore } from "../mobx";
import { AppStatus } from "../mobx/runtime";
import { SupportedCoins } from "../constant/supportedCoins";
import { NETWORK_SCRIPT_TO_COIN } from "../constant/bitcoin";
import { queryCoinV2 } from "../api";

export const useExtendedPubKey = () => {
  const { global: { network, scriptType }, current, runtime: { setStatus } } = useKeystoneStore();
  const [count, setCount] = useState(0);
  const [balance, setBalance] = useState(0);

  const [utxoList, setUTXOList] = useState<Utxo[]>([]);
  const [receiveAddressList, setReceiveAddressList] = useState<Address[]>([]);
  const [changeAddressList, setChangeList] = useState<Address[]>([]);

  const refresh = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    const queryBalance = async () => {
      const assetCode: SupportedCoins = NETWORK_SCRIPT_TO_COIN[network][scriptType];
      const response = await queryCoinV2();
      if(!!response) {
        return Number(response.coins[assetCode].balance);
      }
      return 0;
    }

    if (current?.xpub) {
      setStatus(AppStatus.FetchBalance);
      queryBalance().then(balance => {
        setBalance(balance);
        current.updateBalance(balance);
        setStatus(AppStatus.Ready);
      }).catch((e) => {
        console.error(e);
        setStatus(AppStatus.Ready);
      });
    }
  }, [current, count, network]);

  return {
    balance,
    utxoList,
    receiveAddressList,
    changeAddressList,
    refresh,
  };
};
