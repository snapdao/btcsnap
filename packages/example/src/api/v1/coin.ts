import { SupportedCoins } from "../../constant/supportedCoins";
import { query } from "../request-utils/query";
import { RequestType } from "../types";
import { BackendAsset } from "./types";

const endpoint = '/v1/self_custody/coins/';

export type CoinsResponse = {
  coins: Record<SupportedCoins, BackendAsset>;
};

export const queryCoinV1 = (coinCode: SupportedCoins): Promise<CoinsResponse> => {
  return query(endpoint, RequestType.Get, {}, {coin: coinCode});
};