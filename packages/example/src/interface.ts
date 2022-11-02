export enum BitcoinNetwork {
  Main = "mainnet",
  Test = "testnet",
}

export enum BitcoinScriptType {
  P2PKH = "P2PKH",
  P2SH_P2WPKH = "P2SH-P2WPKH",
  P2WPKH = "P2WPKH",
}

export enum BitcoinUnit {
  BTC = 'BTC',
  Sats = 'Sats',
  Currency = 'Currency'
}

export type Utxo = {
  address: string;
  transactionHash: string;
  index: number;
  value: number;
  pubkey: Buffer;
  rawHex: string;
  path: string;
};

export type Address = {
  address: string | undefined;
  path: string;
  pubkey: Buffer;
};
