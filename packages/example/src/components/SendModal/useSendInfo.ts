import { useUtxo } from '../../hook/useUtxo';
import { useFeeRate } from '../../hook/useFeeRate';
import { useCallback, useEffect, useState } from 'react';
import { SendInfo } from '../../lib';
import { fromHdPathToObj } from '../../lib/cryptoPath';
import { useAppStore } from '../../mobx';
import { coinManager } from '../../services/CoinManager';
import { useReceiveAddress } from '../../hook/useReceiveAddress';
import { IAccount } from '../../mobx/types';

type ChangeAddress = Omit<SendInfo, 'masterFingerprint'>;

export const useSendInfo = () => {
  const { current, settings } = useAppStore();
  const { utxoList, nextChange, pendingValue } = useUtxo();
  const { feeRate } = useFeeRate();
  const [sendInfo, setSendInfo] = useState<SendInfo | undefined>();
  const { path: receivePath, address: receiveAddress } = useReceiveAddress();
  const isChangeAddressEnabled = settings.changeAddress;

  const getChangeAddress = useCallback((current: IAccount, nextChangeHDPath: string): ChangeAddress | undefined => {
    if(!nextChangeHDPath){
      return;
    }

    const { index } = fromHdPathToObj(nextChangeHDPath);
    const changeAddressPubkey = coinManager.xpubToPubkey(current.xpub, Number(1), Number(index));
    const changeAddress = coinManager.deriveAddress(changeAddressPubkey, current.scriptType, current.network);

    return {
      changeAddressPath: nextChangeHDPath,
      changeAddressPubkey,
      changeAddress,
    };
  }, []);

  const getReceiveAddressAsChangeAddress = useCallback((current: IAccount, receivePath: string, receiveAddress: string): ChangeAddress | undefined => {
    if(!receivePath || !receiveAddress){
      return;
    }

    const receivePathTair = receivePath.slice(1); // M/*/* to /*/*
    const receiveHDPath = `${current.path}${receivePathTair}`;
    const receiveAddressIndex = fromHdPathToObj(receiveHDPath).index;

    return {
      changeAddressPath: receiveHDPath,
      changeAddressPubkey: coinManager.xpubToPubkey(current.xpub, Number(0), Number(receiveAddressIndex)),
      changeAddress: receiveAddress,
    };
  }, []);

  useEffect(() => {
    if(current && utxoList.length > 0) {
      const address = isChangeAddressEnabled
        ? getChangeAddress(current, nextChange)
        : getReceiveAddressAsChangeAddress(current, receivePath, receiveAddress);

      if(address) {
        setSendInfo({
          masterFingerprint: Buffer.from(current.mfp, 'hex'),
          ...address,
          receiveAddress
        });
      }
    }
  }, [current, utxoList, isChangeAddressEnabled, nextChange, receivePath, receiveAddress]);

  return {
    feeRate,
    utxos: utxoList,
    sendInfo,
    pendingValue
  };
};
