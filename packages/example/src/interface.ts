export enum BitcoinNetwork {
  Main,
  Test,
}

export enum BitcoinScriptType {
  P2PKH,
  P2SH,
  P2WPKH,
}

export type Utxo = {
  address: string;
  transactionHash: string;
  index: number;
  value: number;
  rawHex?: string;
};

export type Address = {
  address: string | undefined;
  path: string;
  pubkey: Buffer;
};
