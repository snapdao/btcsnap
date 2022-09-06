import { SupportedCoins } from '../../constant/supportedCoins';

export type BackendAsset = {
  coinInfo: AssetInfo;
  wallets: WalletInfo[];
};

export type AssetInfo = {
  assetCoin: string;
  chainCoin: SupportedCoins;
  name: string;
  decimal: number;
  isToken: boolean;
  displayCode: string;
  tokenType: string;
  tokenAddress: string;
  rate: string;
  iconUrl: string;
  active: boolean;
};

export type WalletInfo = {
  assetCoin: string;
  balance: string;
  address: string;
  hdPath: string;
};
