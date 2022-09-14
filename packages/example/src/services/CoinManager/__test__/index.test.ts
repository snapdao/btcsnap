import { Bitcoin } from "../Bitcoin";
import { BitcoinNetwork, BitcoinScriptType } from "../../../interface";

export const coinManager = new Bitcoin()

describe('CoinManager', () => {
  it('should generate bitcoin address from extended public key', () => {
    const testPubKey =
      'tpubDDJbAqXq6EFowpDuCv4Q3Wa7WGHJjUCQyY3pxAFMrrna7FTLV8Q835J8kqPyFvNBE7oXtvES6jJsS51jNoYMpmG39kYBGG8Ps8XWccA16vB';
    const pubkey = coinManager.xpubToPubkey(testPubKey, 0, 0);
    const address = coinManager.deriveAddress(pubkey, BitcoinScriptType.P2PKH, BitcoinNetwork.Test);
    expect(address).toEqual('mfd7TvZMbF9gcn5JzyjsdJ64A6pVPoSLdk');
  });
});
