import { getTransactionLink, getTransactionDetailsLink } from '../explorer';
import { BitcoinNetwork } from '../../interface';

describe('explorer', () => {
  describe('getTransactionLink', () => {
    it('should return full link when network is mainnet', () => {
      const transactionHash = '5188d5872e2128d9886b7bb6f3b8b5840fa5bb0af887de9256427a2949fd668b';
      const network = BitcoinNetwork.Main;
      const link = getTransactionLink(transactionHash, network);
      expect(link).toEqual('https://blockchair.com/bitcoin/transaction/5188d5872e2128d9886b7bb6f3b8b5840fa5bb0af887de9256427a2949fd668b');
    });

    it('should return full link when network is testnet', () => {
      const transactionHash = '5188d5872e2128d9886b7bb6f3b8b5840fa5bb0af887de9256427a2949fd668b';
      const network = BitcoinNetwork.Test;
      const link = getTransactionLink(transactionHash, network);
      expect(link).toEqual('https://blockchair.com/bitcoin/testnet/transaction/5188d5872e2128d9886b7bb6f3b8b5840fa5bb0af887de9256427a2949fd668b');
    });
  });

  describe('getTransactionDetailsLink', () => {
    it('should return full link when network is mainnet', () => {
      const id = '0fbfb2cfd9fc14f288f06355a291d7ab31a631a36425f15b1804ad2fe59a21c9';
      const network = BitcoinNetwork.Main;
      const link = getTransactionDetailsLink(id, network);
      expect(link).toEqual('https://mempool.space/tx/0fbfb2cfd9fc14f288f06355a291d7ab31a631a36425f15b1804ad2fe59a21c9');
    });

    it('should return full link when network is testnet', () => {
      const id = '0fbfb2cfd9fc14f288f06355a291d7ab31a631a36425f15b1804ad2fe59a21c9';
      const network = BitcoinNetwork.Test;
      const link = getTransactionDetailsLink(id, network);
      expect(link).toEqual('https://mempool.space/testnet/tx/0fbfb2cfd9fc14f288f06355a291d7ab31a631a36425f15b1804ad2fe59a21c9');
    });
  });
});
