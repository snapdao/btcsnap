import { useAppStore, utils } from '../mobx';
import { useCallback, useEffect, useState } from 'react';
import { fetchAddresses } from '../api/v1/fetchAddress';
import { fromHdPathToObj } from '../lib/cryptoPath';
import { IAccount, IAddressIn } from '../mobx/types';
import { useMFPCheck } from './useMFPCheck';
import { logger } from '../logger';

export const useReceiveAddress = () => {
  const { current, settings: { dynamicAddress } } = useAppStore();
  const [address, setAddress] = useState<string>('');
  const [path, setPath] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { isChecking, isSameMFP } = useMFPCheck();

  const fetchAddress = useCallback(async (current: IAccount) => {
    try {
      const { unused } = await fetchAddresses(current.mfp, current.xpub, current.coinCode);
      const receiveAddress = unused.find(address => fromHdPathToObj(address.hdPath).change === '0')!;
      const receiveAddressIndex = Number(fromHdPathToObj(receiveAddress.hdPath).index) || 0;
      return {
        index: receiveAddressIndex,
        address: receiveAddress.address
      };
    } catch (e) {
      logger.error(e);
      return {
        index: current.receiveAddress.index,
        address: current.receiveAddress.address
      };
    }
  }, []);

  const setReceiveAddress = (current: IAccount) => {
    const receiveAddress = current.receiveAddress;
    setAddress(receiveAddress.address);
    setPath(`M/0/${receiveAddress.index}`);
  };

  useEffect(() => {
    if(current) {
      if(isChecking || (!isChecking && !isSameMFP)){
        setAddress('');
        setPath('');
        return;
      }

      if (dynamicAddress) {
        setLoading(true);
        fetchAddress(current).then(({ index, address }) => {
          const receiveAddress = {
            id: utils.generateAddressId(),
            parent: '',
            address,
            coinCode: current.coinCode,
            change: 0,
            index,
          } as IAddressIn;
          current.validateAndAddAddress(receiveAddress, dynamicAddress);
          setReceiveAddress(current);
          setLoading(false);
        });
      } else {
        setReceiveAddress(current);
      }
    } else {
      setAddress('');
      setPath('');
    }
  }, [current, isChecking, isSameMFP]);

  return {
    address,
    path,
    loading
  };
};
