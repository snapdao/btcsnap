import { hrpToSatoshi } from '../unitHelper';

describe('unitHelper', () => {
  describe('hrpToSatoshi', () => {
    it('should return satoshi given hrp with n', () => {
      const hrp = '1234567890n';
      expect(hrpToSatoshi(hrp)).toBe('123456789');
    });

    it('should return amount given hrp with u', () => {
      const hrp = '1234567u';
      expect(hrpToSatoshi(hrp)).toBe('123456700');
    });

    it('should return amount given hrp with m', () => {
      const hrp = '1234m';
      expect(hrpToSatoshi(hrp)).toBe('123400000');
    });

    it('should return amount given hrp with p', () => {
      const hrp = '20000p';
      expect(hrpToSatoshi(hrp)).toBe('2');
    });

    it('should return satoshi given hrp do not have a divisor', () => {
      const hrp = '2';
      expect(hrpToSatoshi(hrp)).toBe('200000000');
    });

    it('should return 0 given hrp less than 1 satoshi', () => {
      const hrp = '20p';
      expect(hrpToSatoshi(hrp)).toBe('0');
    });

    it('should throw error if given hrp divisor is not valid', () => {
      expect(() => hrpToSatoshi('123w')).toThrowError('Amount is not valid');
    });

    it('should throw error if given hrp format is not valid', () => {
      expect(() => hrpToSatoshi('123f0')).toThrowError('Amount is not valid');
    });
  });
});
