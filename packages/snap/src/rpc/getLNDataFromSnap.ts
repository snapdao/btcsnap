import { getPrivateKey } from "../utils/getPrivateKey";
import { Wallet, PersistedData, KeyOptions, LNHdPath } from "../interface";
import { getPersistedData } from "../utils/manageState";
import CryptoJs from "crypto-js";

export async function getLNDataFromSnap(
  domain: string,
  wallet: Wallet,
  walletId: string,
  key: KeyOptions
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
        const encryptText = lightning[walletId].credential;
        const salt = CryptoJs.enc.Hex.parse(encryptText.substring(0, 32));
        const iv = CryptoJs.enc.Hex.parse(encryptText.substring(32, 64));
        const encrypted = encryptText.substring(64);
        const privateKey = (await getPrivateKey(wallet, LNHdPath)).toString('hex');
        const key = CryptoJs.PBKDF2(privateKey, salt, { keySize: 512/32, iterations: 1000 });
        const credential = CryptoJs.AES.decrypt(encrypted, key, {iv: iv});

        return credential.toString(CryptoJs.enc.Utf8);
      } else {
        throw new Error('User reject to access the key');
      }
    default:
      throw new Error('Key cannot be recognized');
  }
}
