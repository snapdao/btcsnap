export interface GetPublicExtendedKeyRequest {
  method: 'btc_getPublicExtendedKey';
  params: {
    network: BitcoinNetwork;
    scriptType: ScriptType;
  };
}

export interface GetAllXpubsRequest {
  method: 'btc_getAllXpubs';
  params: Record<string, never>
}

export interface SignPsbtOptions {
  signInputOpts?: SignInputOptions[];
}

export interface SignPsbt {
  method: 'btc_signPsbt';
  params: {
    psbt: string;
    network: BitcoinNetwork;
    scriptType: ScriptType;
    opts?: SignPsbtOptions;
  };
}

export interface SignInputOptions {
  sighashTypes?: number[];
  disableTweakSigner?: boolean;
}

export interface SignInput {
  method: 'btc_signInput';
  params: {
    psbt: string;
    network: BitcoinNetwork;
    scriptType: ScriptType;
    inputIndex: number,
    opts?: SignInputOptions,
  };
}

export interface GetMasterFingerprint {
  method: 'btc_getMasterFingerprint';
}

export interface ManageNetwork {
  method: 'btc_network';
  params: {
    action: 'get' | 'set';
    network?: BitcoinNetwork;
  };
}

export interface SaveLNDataToSnap {
  method: 'btc_saveLNDataToSnap';
  params: {
    walletId: string;
    credential: string;
    password: string;
  };
}

export interface GetLNDataFromSnap {
  method: 'btc_getLNDataFromSnap';
  params: {
    key: KeyOptions;
    walletId?: string;
    type?: 'get' | 'refresh'
  };
}

export interface SignLNInvoice {
  method: 'btc_signLNInvoice';
  params: {
    invoice: string;
  };
}

export type MetamaskBTCRpcRequest =
  | GetAllXpubsRequest
  | GetPublicExtendedKeyRequest
  | SignPsbt
  | SignInput
  | GetMasterFingerprint
  | ManageNetwork
  | SaveLNDataToSnap
  | GetLNDataFromSnap
  | SignLNInvoice;

export type BTCMethodCallback = (
  originString: string,
  requestObject: MetamaskBTCRpcRequest,
) => Promise<unknown>;

export interface Snap {
  registerRpcMessageHandler: (fn: BTCMethodCallback) => unknown;
  request<T>(options: {
    method: string;
    params?: unknown[] | Record<string, any>;
  }): Promise<T>;
}

export enum ScriptType {
  P2PKH = 'P2PKH',
  P2SH_P2WPKH = 'P2SH-P2WPKH',
  P2WPKH = 'P2WPKH',
  P2TR = 'P2TR',
}

export enum BitcoinNetwork {
  Main = 'main',
  Test = 'test',
}

export enum KeyOptions {
  Password = 'password',
  Credential = 'credential',
  PubKey = 'pubkey',
}

const LightningAccount = Buffer.from('Lightning').readInt32BE();
export const LNHdPath = `m/84'/0'/${LightningAccount}'/0/0`;

export interface PersistedData {
  network?: BitcoinNetwork;
  lightning?: {
    [walletId: string]: {
      credential: string;
      password: string;
    };
  };
}

export interface SLIP10Node {
  /**
   * The 0-indexed path depth of this node.
   */
  readonly depth: number;

  /**
   * The fingerprint of the master node, i.e., the node at depth 0. May be
   * undefined if this node was created from an extended key.
   */
  readonly masterFingerprint?: number;

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
