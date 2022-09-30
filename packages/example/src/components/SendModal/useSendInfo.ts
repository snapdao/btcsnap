import { useUtxo } from "../../hook/useUtxo";
import { useFeeRate } from "../../hook/useFeeRate";
import { useCallback, useEffect, useState } from "react";
import { SendInfo } from "../../lib";
import { IAccount } from "../../mobx/types";
import { fetchAddresses } from "../../api/v1/fetchAddress";
import { fromHdPathToObj } from "../../lib/cryptoPath";
import { useKeystoneStore } from "../../mobx";
import { Address, Utxo } from "../../interface";
import { coinManager } from "../../services/CoinManager";


export const useSendInfo = () => {
  const { current } = useKeystoneStore();
  const { utxoList, nextChange } = useUtxo();
  const { feeRate } = useFeeRate();
  const [sendInfo, setSendInfo] = useState<SendInfo | undefined>();

  useEffect(() => {
    if(current && utxoList.length > 0) {

      const {index} = fromHdPathToObj(nextChange)
      const changeAddressPubkey = coinManager.xpubToPubkey(current.xpub, Number(1), Number(index));
      const changeAddress = coinManager.deriveAddress(changeAddressPubkey, current.scriptType, current.network);
      
      setSendInfo({
        masterFingerprint: Buffer.from(current.mfp, "hex"),
        changeAddress,
        changeAddressPath: nextChange,
        changeAddressPubkey: changeAddressPubkey
      })
      
    }
  }, [current, utxoList, nextChange])
  
  
  return {
    feeRate,
    utxos: utxoList,
    sendInfo
  }
}