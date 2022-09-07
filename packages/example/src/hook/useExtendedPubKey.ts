import { useEffect, useState } from 'react';
import { Address, Utxo } from '../interface';
import { useKeystoneStore } from "../mobx";
import { AppStatus } from "../mobx/runtime";
import { SupportedCoins } from "../constant/supportedCoins";
import { NETWORK_SCRIPT_TO_COIN } from "../constant/bitcoin";
import { queryCoinV2 } from "../api";
import { queryCoinV1 } from "../api/v1/coin";

export const useExtendedPubKey = () => {
  const {settings: {network, scriptType}, current, runtime: {setStatus, setRate}} = useKeystoneStore();
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
      const coinCode: SupportedCoins = NETWORK_SCRIPT_TO_COIN[network][scriptType];
      return Promise.all([queryCoinV1(coinCode), queryCoinV2()])
        .then((values) => {
          const [v1Res, v2Res] = values;
          const rate = Number(v1Res.coins[coinCode].coinInfo.rate) || 0;
          const balance = Number(v2Res.coins[coinCode].balance) || 0;
          return {balance, rate};
        })
        .catch(e => {
          throw e;
        })
    }

    if (current?.xpub) {
      setStatus(AppStatus.FetchBalance);
      queryBalance().then(({balance, rate}) => {
        setBalance(balance);
        current.updateBalance(balance);
        setRate(rate);
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
