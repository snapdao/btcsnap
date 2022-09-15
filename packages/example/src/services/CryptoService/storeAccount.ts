import { getKeystoneStore, utils } from "../../mobx";
import { BitcoinNetwork, BitcoinScriptType } from "../../interface";
import { IAccountIn } from "../../mobx/types";
import { EXTENDED_PUBKEY_PATH, NETWORK_SCRIPT_TO_COIN } from "../../constant/bitcoin";
import { fetchAddresses } from "../../api/v1/fetchAddress";
import { fromHdPathToObj } from "../../lib/cryptoPath";
import Address from "../../mobx/address";

const constructAccount = (mfp: string, xpub: string, scriptType: BitcoinScriptType, network: BitcoinNetwork): IAccountIn => ({
  id: utils.generateAccountId(),
  mfp,
  xpub,
  path: EXTENDED_PUBKEY_PATH[network][scriptType],
  coinCode: NETWORK_SCRIPT_TO_COIN[network][scriptType],
  addresses: [],
  scriptType,
  network,
  receiveAddressIndex: 0,
})

export const storeAccount = async (
  xpub: string,
  mfp: string,
  scriptType: BitcoinScriptType,
  network: BitcoinNetwork,
) => {
  const keystoneStore = getKeystoneStore();
  try {
    const accountData = constructAccount(mfp, xpub, scriptType, network);
    const storeAccount = keystoneStore.createAccount(accountData)
    keystoneStore.applyAccount(storeAccount);

    const { unused } = await fetchAddresses(mfp, xpub, storeAccount.coinCode);
    const receiveAddress = unused.filter(address => fromHdPathToObj(address.hdPath).change === "0")?.[0];
    const receiveAddressIndex = Number(fromHdPathToObj(receiveAddress?.hdPath).index) || 0;
    storeAccount.setReceiveAddressIndex(receiveAddressIndex);

    const storeReceiveAddress = {
      id: utils.generateAddressId(),
      parent: "",
      address: receiveAddress?.address,
      coinCode: NETWORK_SCRIPT_TO_COIN[network][scriptType],
      change: 0,
      index: receiveAddressIndex
    };
    storeAccount.validateAndAddAddress(storeReceiveAddress, keystoneStore.settings.dynamicAddress);
  } catch (e) {
    console.error("Create Account failed", e);
    throw e;
  }
};
