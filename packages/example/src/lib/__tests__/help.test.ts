import { satoshiToBTC, btcToSatoshi } from '../helper';

describe('help', () => {
  describe('satoshiToBTC', () => {
    it('should return the right BTC given satoshi', () => {
      const satoshi = 10000000;
      const BTC = satoshiToBTC(satoshi);
      expect(BTC).toBe(0.1);
    });
  });

  describe('btcToSatoshi', () => {
    it('should return the right Satoshi given BTC', () => {
      const btc = 100;
      const Satoshi = btcToSatoshi(btc);
      expect(Satoshi).toBe(10000000000);
    });

    it('should return the right Satoshi given BTC as float number', () => {
      const btc = 0.00000001;
      const Satoshi = btcToSatoshi(btc);
      expect(Satoshi).toBe(1);
    });
  });
});
