import { Bitcoin } from '../Bitcoin';
import { BitcoinNetwork, BitcoinScriptType } from '../../../interface';

// abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about

export const coinManager = new Bitcoin();

// hybrid betray symbol aim promote vehicle extend west slice silver man belt
describe('CoinManager', () => {

  describe('deriveAddress', () => {
    it('should generate bitcoin address from extended public key for P2PKH mainnet', () => {
      const testPubKey =
        'xpub6CAcsYkoMZb2mdMzHoi37RBd6LeTnqhkWKhsBezXmCXhgs6UxiN3w6KcG1WP171JWjrudVQHmAW73n2T6vSGPt5jmDq4wVkZbB4sSZrt9Je';
      const pubkey = coinManager.xpubToPubkey(testPubKey, 0, 0);
      const address = coinManager.deriveAddress(pubkey, BitcoinScriptType.P2PKH, BitcoinNetwork.Main);
      expect(address).toEqual('1JUpXjgozNQniVcMZmnLAMUPcB11SGfm79');
    });

    it('should generate bitcoin address from extended public key for P2PKH testnet', () => {
      const testPubKey =
        'tpubDCRyt3yLmMumKbuyXosCoAEZfjrGt88Wvgu6FxgSwWSPLR4WVqR5kLwLUqEB4jWj9PiBsSzFyeuqeJfZYsXiZtNcVAZUJk1gaTiy3geC4e1';
      const pubkey = coinManager.xpubToPubkey(testPubKey, 0, 1);
      const address = coinManager.deriveAddress(pubkey, BitcoinScriptType.P2PKH, BitcoinNetwork.Test);
      expect(address).toEqual('mnHRd9g3v1MdycXBgbGtqFVKU7EfgDrgCm');
    });

    it('should generate bitcoin address from extended public key for P2SH mainnet', () => {
      const testPubKey =
        'ypub6XzcxA33Tou9niFDj6eNHr77ni6YFbZg46nj71atoDQgupM81koF8vjJd4QBZTrgzMZBe6yGaCReBdSDhDGxeURzDgm3DbaYq5MdzVj5HtU';
      const pubkey = coinManager.xpubToPubkey(testPubKey, 0, 0);
      const address = coinManager.deriveAddress(pubkey, BitcoinScriptType.P2SH_P2WPKH, BitcoinNetwork.Main);
      expect(address).toEqual('3P8c77gZi7Z7gw7mUM51hZeA6wgGSVw2ga');
    });

    it('should generate bitcoin address from extended public key for P2SH testnet', () => {
      const testPubKey =
        'upub5EDhnYucnpRfUVPcsEySqULrj1d2xzGT2ttuVdxe3ZuVb715wndB2bT1kAnK1vChVsb6oFguJn5poLbE5n1FfULCEibaChMxzWEXTh4iEmn';
      const pubkey = coinManager.xpubToPubkey(testPubKey, 0, 1);
      const address = coinManager.deriveAddress(pubkey, BitcoinScriptType.P2SH_P2WPKH, BitcoinNetwork.Test);
      expect(address).toEqual('2MwpB4Kjf2NjpvVjV8ZqZL3vdnfDU5rZCmR');
    });

    it('should generate bitcoin address from extended public key for P2WPKH mainnet', () => {
      const testPubKey =
        'zpub6qi1jhRN6s1ZWShfcqMEfGUyJM74V4BQzfscNxdQRp6QL1xf3X1jczcTkwDywQuay8CAkYLhb1ZAAEk5UD8wfnXYVm2ChqitvWT6T1YTfhm';
      const pubkey = coinManager.xpubToPubkey(testPubKey, 0, 0);
      const address = coinManager.deriveAddress(pubkey, BitcoinScriptType.P2WPKH, BitcoinNetwork.Main);
      expect(address).toEqual('bc1q30txu8fer3uvx4xaa3cmrn8gc948gx8lyeahk7');
    });

    it('should generate bitcoin address from extended public key for P2WPKH testnet', () => {
      const testPubKey =
        'vpub5ZbRxxkxeYzDYP9wLrXPaykSjxZ54LoZvMwMBpswRMp7gn8ShDNptC7pqTggcC4BQQ9cDx1RCqwKmLkUeniiDBR9mcxxFnvSSwubiqAdG8P';
      const pubkey = coinManager.xpubToPubkey(testPubKey, 0, 1);
      const address = coinManager.deriveAddress(pubkey, BitcoinScriptType.P2WPKH, BitcoinNetwork.Test);
      expect(address).toEqual('tb1qqnfmvfmmvj63r29rtwd43jxl3k6dlugk6fcy0z');
    });

    it('should throw error given unexpected script type', () => {
      expect(() => { coinManager.deriveAddress(Buffer.from('02b866b6322952cc462c80c4bb6d9c952d1d344b4ea6d74a61972f6125887a7873', 'hex'), 'p2pk' as any, BitcoinNetwork.Test); })
        .toThrowError('generate address failed');
    });
  });

});
