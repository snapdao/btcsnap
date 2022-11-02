import { networks } from 'bitcoinjs-lib';
import { getNetwork } from '../getNetwork';
import { BitcoinNetwork } from '../../interface';

describe('getNetwork', () => {
  it('should map BitcoinNetwork mainnet to bitcoin mainnet', () => {
    expect(getNetwork(BitcoinNetwork.Main)).toBe(networks.bitcoin)
  });

  it('should map BitcoinNetwork testnet to bitcoin testnet', () => {
    expect(getNetwork(BitcoinNetwork.Test)).toBe(networks.testnet)
  });

  it('should throw error given invalid network', () => {
    expect(() => {getNetwork('litcoin' as any)}).toThrowError('Network net exist')
  });
});
