import { Bitcoin } from "../Bitcoin";
import { BitcoinNetwork, BitcoinScriptType } from "../../../interface";

// abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about

export const coinManager = new Bitcoin()

describe('CoinManager', () => {
  it('should generate bitcoin address from extended public key', () => {
    const testPubKey =
      'tpubDC5FSnBiZDMmhiuCmWAYsLwgLYrrT9rAqvTySfuCCrgsWz8wxMXUS9Tb9iVMvcRbvFcAHGkMD5Kx8koh4GquNGNTfohfk7pgjhaPCdXpoba';
    const pubkey = coinManager.xpubToPubkey(testPubKey, 0, 0);
    const address = coinManager.deriveAddress(pubkey, BitcoinScriptType.P2PKH, BitcoinNetwork.Test);
    expect(address).toEqual('mkpZhYtJu2r87Js3pDiWJDmPte2NRZ8bJV');
  });
});
