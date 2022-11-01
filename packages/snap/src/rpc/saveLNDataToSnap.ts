import { Wallet, LNHdPath } from '../interface';
import { getPrivateKey } from '../utils/getPrivateKey';
import { getPersistedData, updatePersistedData } from '../utils/manageState';
import CryptoJs from 'crypto-js';

export async function saveLNDataToSnap(
  domain: string,
  wallet: Wallet,
  walletId: string,
  credential: string,
  password: string
) {
  const privateKey = (await getPrivateKey(wallet, LNHdPath)).toString('hex');
  const encryptText = CryptoJs.AES.encrypt(credential, privateKey).toString();
  const result = await getPersistedData(wallet, 'lightning', {});
  const newLightning = {
    ...result,
    [walletId]: {
      credential: encryptText,
      password: password
    }
  };

  await updatePersistedData(wallet, "lightning", newLightning);
}
