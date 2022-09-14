import { BitcoinNetwork } from '../interface';

export const getTransactionLink = (transactionHash: string, network: BitcoinNetwork) => {
  const explorerHost = "https://blockchair.com";
  const host =
    network === BitcoinNetwork.Test
      ? `${explorerHost}/bitcoin/testnet`
      : `${explorerHost}/bitcoin`;
  return `${host}/transaction/${transactionHash}`;
}
