import { generateReceiveAddress } from '../../lib/index';

describe('lib', () => {
  it('should generate bitcoin address from extended public key', () => {
    const testPubKey =
      'tpubDDJbAqXq6EFowpDuCv4Q3Wa7WGHJjUCQyY3pxAFMrrna7FTLV8Q835J8kqPyFvNBE7oXtvES6jJsS51jNoYMpmG39kYBGG8Ps8XWccA16vB';
    const result = generateReceiveAddress(testPubKey);
    expect(result.length).toEqual(10);
    expect(result[4]['address']).toEqual('mfd7TvZMbF9gcn5JzyjsdJ64A6pVPoSLdk');
  });
});
