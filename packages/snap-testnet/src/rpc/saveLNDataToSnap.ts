import {Snap, LNHdPath} from '../interface';
import {getHDNode} from '../utils/getHDNode';
import {getPersistedData, updatePersistedData} from '../utils/manageState';
import CryptoJs from 'crypto-js';

export async function saveLNDataToSnap(
  domain: string,
  snap: Snap,
  walletId: string,
  credential: string,
  password: string,
) {
  const privateKey = (await getHDNode(snap, LNHdPath)).privateKey.toString(
    'hex',
  );
  const salt = CryptoJs.lib.WordArray.random(16);
  const key = CryptoJs.PBKDF2(privateKey, salt, {
    keySize: 16,
    iterations: 1000,
  });

  const iv = CryptoJs.lib.WordArray.random(16);
  const encrypted = CryptoJs.AES.encrypt(credential, key, {iv: iv});
  const encryptText = salt.toString() + iv.toString() + encrypted.toString();
  const result = await getPersistedData(snap, 'lightning', {});
  const newLightning = {
    ...result,
    [walletId]: {
      credential: encryptText,
      password: password,
    },
  };

  await updatePersistedData(snap, 'lightning', newLightning);
}
