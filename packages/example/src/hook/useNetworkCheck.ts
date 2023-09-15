import { useEffect, useState } from 'react';
import { useAppStore } from '../mobx';
import { getNetworkInSnap, updateNetworkInSnap } from '../lib/snap';
import { BitcoinNetwork } from '../interface';
import { AppStatus } from '../mobx/runtime';
import { capitalize } from '../utils/stringHelper';

export const useNetworkCheck = () => {
  const { current, persistDataLoaded, settings: { setNetwork }, switchToAccount, runtime: { setStatus } } = useAppStore();
  const [networkMessage, setNetworkMessage] = useState<string>('');
  const [isSettingNetwork, setIsSettingNetwork] = useState<boolean>(false);

  const switchNetworkAndUpdateState = (targetNetwork: BitcoinNetwork) => {
    setNetwork(targetNetwork);
    current && switchToAccount(current.mfp, current.scriptType, targetNetwork);
    setStatus(AppStatus.FetchBalance);
  };

  useEffect(() => {
    if(!persistDataLoaded){
      return;
    }

    if(current){
      getNetworkInSnap().then(network => {
        if(network === ''){
          setIsSettingNetwork(true);
          updateNetworkInSnap(current.network).then(() => {
            setIsSettingNetwork(false);
          });
        } else {
          const networkInSnap = network === 'test' ? BitcoinNetwork.Test : BitcoinNetwork.Main;
          const isNetworkTheSame = networkInSnap === current.network;
          if (!isNetworkTheSame) {
            switchNetworkAndUpdateState(networkInSnap);
            setNetworkMessage(`Currently In ${capitalize(networkInSnap)}`);
          }
        }
      });
    }
  }, [persistDataLoaded, current]);

  return {
    isSettingNetwork,
    networkMessage
  };
};
