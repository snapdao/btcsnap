import { useKeystoneStore, utils } from "../mobx";
import { useCallback, useEffect, useState } from "react";
import { fetchAddresses } from "../api/v1/fetchAddress";
import { fromHdPathToObj } from "../lib/cryptoPath";
import { IAccount, IAddressIn } from "../mobx/types";
import { useMFPCheck } from "./useMFPCheck";

export const useReceiveAddress = () => {
  const { current, settings: { dynamicAddress }} = useKeystoneStore();
  const [address, setAddress] = useState<string>("");
  const [path, setPath] = useState<string>("");
  const isSameMFP = useMFPCheck();

  const fetchAddress = useCallback(async (current: IAccount) => {
    try {
      const {unused} = await fetchAddresses(current.mfp, current.xpub, current.coinCode);
      const receiveAddress = unused.find(address => fromHdPathToObj(address.hdPath).change === "0")!;
      const receiveAddressIndex = Number(fromHdPathToObj(receiveAddress.hdPath).index) || 0;
      return {
        index: receiveAddressIndex,
        address: receiveAddress.address
      }
    } catch (e) {
      console.error("Failed to fetch address", e);
      return {
        index: current.receiveAddressIndex,
        address: current.getReceiveAddress()
      }
    }
  }, [])

  const setReceiveAddress = (current: IAccount) => {
    const receiveAddress = current.getReceiveAddress();
    if(receiveAddress) {
      setAddress(receiveAddress.address);
      setPath(`M/0/${receiveAddress.index}`);
    }
  }
  
  useEffect(() => {
    if(current && isSameMFP) {
      if (dynamicAddress) {
        fetchAddress(current).then(({index, address}) => {
          const receiveAddress = {
            id: utils.generateAddressId(),
            parent: "",
            address,
            coinCode: current.coinCode,
            change: 0,
            index,
          } as IAddressIn;
          current.validateAndAddAddress(receiveAddress, dynamicAddress)
          setReceiveAddress(current);
        })
      } else {
        setReceiveAddress(current);
      }
    } else {
      setAddress("");
      setPath("");
    }
  }, [current, isSameMFP])
  
  return {
    address,
    path
  }
}
