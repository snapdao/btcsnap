import { getPrivateKey } from "../utils/getPrivateKey";
import { Wallet, PersistedData, KeyOptions } from "../interface";
import { getPersistedData } from "../utils/manageState";
import CryptoJS from "crypto-js";

export async function getLNDataFromSnap(
  domain: string,
  wallet: Wallet,
  walletId: string,
  key: KeyOptions,
  hdPath: string
): Promise<string> {
  switch(key) {
    case KeyOptions.Password:
      const lightning = await getPersistedData<PersistedData['lightning']>(wallet, "lightning", {});
      return lightning[walletId].password;
    case KeyOptions.Credential:
      const result = await wallet.request({
        method: 'snap_confirm',
        params: [
          {
            prompt: 'Access your Lighting wallet credentials',
            description: `Do you want to allow ${domain} to access your Lighting wallet credentials?`,
          },
        ],
      });
      if(result) {
        const lightning = await getPersistedData<PersistedData['lightning']>(wallet, "lightning", {});
        const encryptedCredential = lightning[walletId].credential;
        const privateKey = (await getPrivateKey(wallet, hdPath)).toString('hex');
        const credential = CryptoJS.AES.decrypt(encryptedCredential, privateKey);
        return credential.toString(CryptoJS.enc.Utf8);
      } else {
        throw new Error('User reject to access the key');
      }
    default:
      throw new Error('Key cannot be recognized');
  }
}
