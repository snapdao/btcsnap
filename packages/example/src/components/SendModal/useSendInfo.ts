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

  const getChangeAddress = useCallback((current: IAccount): ChangeAddress => {
    const { index } = fromHdPathToObj(nextChange);
    const changeAddressPubkey = coinManager.xpubToPubkey(current.xpub, Number(1), Number(index));
    const changeAddress = coinManager.deriveAddress(changeAddressPubkey, current.scriptType, current.network);

    return {
      changeAddressPath: nextChange,
      changeAddressPubkey,
      changeAddress,
    };
  }, [nextChange]);

  const getReceiveAddressAsChangeAddress = useCallback((current: IAccount): ChangeAddress => {
    const receivePathTair = receivePath.slice(1); // M/*/* to /*/*
    const receiveHDPath = `${current.path}${receivePathTair}`;
    const receiveAddressIndex = fromHdPathToObj(receiveHDPath).index;

    return {
      changeAddressPath: receiveHDPath,
      changeAddressPubkey: coinManager.xpubToPubkey(current.xpub, Number(0), Number(receiveAddressIndex)),
      changeAddress: receiveAddress,
    };
  }, [receivePath, receiveAddress]);

  useEffect(() => {
    if(current && utxoList.length > 0) {
      const address = isChangeAddressEnabled
        ? getChangeAddress(current)
        : getReceiveAddressAsChangeAddress(current);

      setSendInfo({
        masterFingerprint: Buffer.from(current.mfp, 'hex'),
        ...address,
        receiveAddress
      });
    }
  }, [current, utxoList, isChangeAddressEnabled, nextChange, receivePath, receiveAddress]);

  return {
    feeRate,
    utxos: utxoList,
    sendInfo,
    pendingValue
  };
};
