export interface GetPublicExtendedKeyRequest{
    method: "btc_getPublicExtendedKey";
  }

export type MetamaskBTCRpcRequest = GetPublicExtendedKeyRequest

export type BTCMethodCallback = (
  originString: string,
  requestObject: MetamaskBTCRpcRequest
) => Promise<unknown>;

export interface Wallet {
  registerRpcMessageHandler: (fn: BTCMethodCallback) => unknown;
  request(options: {method: string; params?: unknown[]}): unknown;
}