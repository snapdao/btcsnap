import { v4 as uuidv4 } from 'uuid';

export const generateWalletId = (info: {asset: string; address: string}) => {
  return `${info.asset}-${info.address}`.toLowerCase();
};

export const generateId = (prefix?: string) => () => {
  return prefix ? `${prefix}-${uuidv4()}` : uuidv4();
};

export const generateAccountId = generateId('account');
export const generateLightningWalletId = generateId('ln-wallet');
export const generateAddressId = generateId('address');
export const generateAssetId = generateId('asset');

export const stringCompare = (a: string, b: string) => {
  return a.localeCompare(b);
};
