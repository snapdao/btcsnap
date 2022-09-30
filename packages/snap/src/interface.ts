export interface GetPublicExtendedKeyRequest{
    method: "btc_getPublicExtendedKey";
    params: {
      network: BitcoinNetwork,
      scriptType: ScriptType
    }
}

export interface SignPsbt{
  method: "btc_signPsbt";
  params: {
    psbt: string,
    network: BitcoinNetwork,
    scriptType: ScriptType
  }
}

export interface GetMasterFingerprint{
  method: "btc_masterFingerprint";
  params: {
    action: "get" | "clear"
  }
}

export interface ManageNetwork {
  method: "btc_network";
  params: {
    action: "get" | "set";
    network?: BitcoinNetwork;
  }
}


export type MetamaskBTCRpcRequest = GetPublicExtendedKeyRequest | SignPsbt | GetMasterFingerprint | ManageNetwork

export type BTCMethodCallback = (
  originString: string,
  requestObject: MetamaskBTCRpcRequest
) => Promise<unknown>;

export interface Wallet {
  registerRpcMessageHandler: (fn: BTCMethodCallback) => unknown;
  request<T>(options: {method: string; params?: unknown[] | Record<string, any>}): Promise<T>;
}


export enum ScriptType {
    P2PKH = "P2PKH",
    P2SH_P2WPKH = "P2SH-P2WPKH",
    P2WPKH = "P2WPKH"
}

export enum BitcoinNetwork {
  Main = "main",
  Test = "test",
}

export interface PersistedData {
  mfp?: string;
  network?: BitcoinNetwork
}

export interface SLIP10Node {
  /**
   * The 0-indexed path depth of this node.
   */
  readonly depth: number;

  /**
   * The fingerprint of the parent key, or 0 if this is a master node.
   */
  readonly parentFingerprint: number;

  /**
   * The index of the node, or 0 if this is a master node.
   */
  readonly index: number;

  /**
   * The private key of this node.
   */
  readonly privateKey: string;

  /**
   * The public key of this node.
   */
  readonly publicKey: string;

  /**
   * The chain code of this node.
   */
  readonly chainCode: string;

  /**
   * The name of the curve used by the node.
   */
  readonly curve: 'ed25519' | 'secp256k1';
}
