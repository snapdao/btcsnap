import {getHDNode} from '../utils/getHDNode';
import {Snap, PersistedData, KeyOptions, LNHdPath} from '../interface';
import {getPersistedData} from '../utils/manageState';
import CryptoJs from 'crypto-js';
import { RequestErrors, SnapError } from "../errors";
import { heading, panel, text } from "@metamask/snaps-ui";

interface GetLNDataFromSnap {
  key: KeyOptions,
  walletId?: string,
  type?: 'get' | 'refresh',
}

export async function getLNDataFromSnap(
  domain: string,
  snap: Snap,
  {
    key,
    walletId,
    type = 'get',
  }: GetLNDataFromSnap
): Promise<string> {
  switch (key) {
    case KeyOptions.PubKey:
      return (await getHDNode(snap, LNHdPath)).publicKey.toString('hex');
    case KeyOptions.Password:
      const lightning = await getPersistedData<PersistedData['lightning']>(
        snap,
        'lightning',
        {},
      );
      return lightning[walletId].password;
    case KeyOptions.Credential:
      const param = {
        get: {
          prompt: 'Access your Lighting wallet credentials',
          description: `Do you want to allow ${domain} to access your Lighting wallet credentials?`,
        },
        refresh: {
          prompt: 'Lightning Wallet Data has Expired.',
          description: 'For security purposes, Lightning Wallet data expires after 7 days and needs to be re-authorized.',
        }
      }[type]
      const result = await snap.request({
        method: 'snap_dialog',
        params: {
          type: 'confirmation',
          content: panel([
            heading(param.prompt),
            text(param.description),
          ]),
        },
      });
      if (result) {
        const lightning = await getPersistedData<PersistedData['lightning']>(
          snap,
          'lightning',
          {},
        );
        const encryptText = lightning[walletId].credential;
        const salt = CryptoJs.enc.Hex.parse(encryptText.substring(0, 32));
        const iv = CryptoJs.enc.Hex.parse(encryptText.substring(32, 64));
        const encrypted = encryptText.substring(64);
        const privateKey = (
          await getHDNode(snap, LNHdPath)
        ).privateKey.toString('hex');
        const key = CryptoJs.PBKDF2(privateKey, salt, {
          keySize: 512 / 32,
          iterations: 1000,
        });
        const credential = CryptoJs.AES.decrypt(encrypted, key, {iv: iv});

        return credential.toString(CryptoJs.enc.Utf8);
      } else {
        throw SnapError.of(RequestErrors.UserReject);
      }
    default:
      throw SnapError.of(RequestErrors.KeyNotSupported);
  }
}
