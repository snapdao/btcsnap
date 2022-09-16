import { SupportedCoins } from '../../constant/supportedCoins';

export type BackendAsset = {
  coinInfo: AssetInfo;
};

export type AssetInfo = {
  assetCoin: string;
  chainCoin: SupportedCoins;
  name: string;
  decimal: number;
  rate: string;
};
