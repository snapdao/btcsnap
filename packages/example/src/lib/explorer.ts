import { BitcoinNetwork } from '../interface';

export const getTransactionLink = (transactionHash: string, network: BitcoinNetwork): string => {
  const explorerHost = 'https://blockchair.com';
  const host =
    network === BitcoinNetwork.Test
      ? `${explorerHost}/bitcoin/testnet`
      : `${explorerHost}/bitcoin`;
  return `${host}/transaction/${transactionHash}`;
};

export const getTransactionDetailsLink = (id: string, network: BitcoinNetwork): string => {
  const explorerHost = 'https://mempool.space';
  const host =
    network === BitcoinNetwork.Test
      ? `${explorerHost}/testnet`
      : `${explorerHost}`;
  return `${host}/tx/${id}`;
};
