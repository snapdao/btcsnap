import { getKeystoneStore, utils } from "../../mobx";
import { BitcoinNetwork, BitcoinScriptType } from "../../interface";
import { IAccountIn } from "../../mobx/types";
import { EXTENDED_PUBKEY_PATH, NETWORK_SCRIPT_TO_COIN } from "../../constant/bitcoin";

const constructAccount = (mfp: string, xpub: string, scriptType: BitcoinScriptType, network: BitcoinNetwork): IAccountIn => ({
  id: utils.generateAccountId(),
  mfp,
  xpub,
  path: EXTENDED_PUBKEY_PATH[network][scriptType],
  coinCode: NETWORK_SCRIPT_TO_COIN[network][scriptType],
  addresses: [],
  scriptType,
  network,
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
    const newAccount = keystoneStore.createAccount(accountData)
    keystoneStore.applyAccount(newAccount);

    newAccount.deriveAndAddNextAddress();
  } catch (e) {
    console.info(e);
    console.error(e);
    throw e;
  }
};
