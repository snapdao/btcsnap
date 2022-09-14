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
  const { utxoList } = useUtxo();
  const { feeRate } = useFeeRate();
  const [sendInfo, setSendInfo] = useState<SendInfo | undefined>();

  const fetchSendInfo = useCallback(async (current: IAccount, utxoList: Utxo[]): Promise<SendInfo|undefined> => {
    try {
      const utxoPaths = utxoList.map(utxo => utxo.path);
      const resp = await fetchAddresses(current.mfp, current.xpub, current.coinCode);
      const {unused, occupied} = resp;
      const changeAddress = unused.find(address => fromHdPathToObj(address.hdPath).change === "1")!.address;
      const addresses = occupied.filter(address => utxoPaths.includes(address.hdPath));

      const addressList: Address[] = addresses.map(({address, hdPath}) => {
        const { change, index } = fromHdPathToObj(hdPath);
        return {
          address,
          path: `m/${change}/${index}`,
          pubkey: coinManager.xpubToPubkey(current.xpub, Number(change), Number(index)),
        }
      })

      return {
        masterFingerprint: Buffer.from(current.mfp, "hex"),
        changeAddress,
        addressList,
      }
    } catch (e) {
      console.error("Failed to fetch address", e);
      return;
    }
  }, [])

  useEffect(() => {
    if(current && utxoList.length > 0) {
      fetchSendInfo(current, utxoList).then(setSendInfo)
    }
  }, [current, utxoList])
  
  
  return {
    feeRate,
    utxos: utxoList,
    sendInfo
  }
}