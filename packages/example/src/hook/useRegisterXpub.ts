import { registerExtendedPubKey } from '../api';
import { useAppStore } from '../mobx';
import { useEffect } from 'react';
import { BitcoinNetwork } from '../interface';
import { EXTENDED_PUBKEY_PATH } from '../constant/bitcoin';

export const useRegisterXpub = () => {
  const { persistDataLoaded, current } = useAppStore();

  useEffect(() => {
    if(persistDataLoaded && !!current && !current.hasSyncXPub) {
      const mfp = current.mfp;
      const scriptType = current.scriptType;
      const network = current.network;
      const coin = network === BitcoinNetwork.Main ? 'BTC' : 'BTC_TESTNET';
      const path = EXTENDED_PUBKEY_PATH[network][scriptType];

      registerExtendedPubKey(coin, path, current.xpub, scriptType, mfp).then(() => {
        current.setHasXpubSynced(true);
      });
    }
  }, []);
};
