import { fromHdPathToObj } from '../cryptoPath';

describe('cryptoPath', () => {
  it('should convert hdPath to obj', () => {
    const hdPath = 'M/84\'/1\'/0\'/1/8';
    const params = fromHdPathToObj(hdPath);
    expect(params).toEqual({ account: '0', change: '1', coinType: '1', index: '8', purpose: '84' });
  });

  it('should return null given wrong hdPath', () => {
    const hdPath = 'abcdefg';
    const params = fromHdPathToObj(hdPath);
    expect(params).toEqual({ account: null, change: null, coinType: null, index: null, purpose: null });
  });
});
