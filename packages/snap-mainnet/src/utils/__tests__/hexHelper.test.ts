import { trimHexPrefix } from '../hexHelper';

describe('hexHelper', () => {
  describe('trimHexPrefix', () => {
    it('should trim prefix 0x given a string start with 0x', () => {
      expect(trimHexPrefix('0x12345678')).toBe('12345678')
    });

    it('should return given string when it is not start with 0x', () => {
      expect(trimHexPrefix('12345678')).toBe('12345678')
    });
  });
});
