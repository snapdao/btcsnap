import { networks } from "bitcoinjs-lib";
import { convertXpub } from "../xpubConverter";
import { ScriptType } from "../../interface";

// abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about
const BIP_32_EXTENDED_PUB_KEY = {
  mainnet: {
    P2PKH: "xpub6BosfCnifzxcFwrSzQiqu2DBVTshkCXacvNsWGYJVVhhawA7d4R5WSWGFNbi8Aw6ZRc1brxMyWMzG3DSSSSoekkudhUd9yLb6qx39T9nMdj",
    P2SH_P2WPKH: "xpub6C6nQwHaWbSrzs5tZ1q7m5R9cPK9eYpNMFesiXsYrgc1P8bvLLAet9JfHjYXKjToD8cBRswJXXbbFpXgwsswVPAZzKMa1jUp2kVkGVUaJa7",
    P2WPKH: "xpub6CatWdiZiodmUeTDp8LT5or8nmbKNcuyvz7WyksVFkKB4RHwCD3XyuvPEbvqAQY3rAPshWcMLoP2fMFMKHPJ4ZeZXYVUhLv1VMrjPC7PW6V"
  },
  testnet: {
    P2PKH: "tpubDC5FSnBiZDMmhiuCmWAYsLwgLYrrT9rAqvTySfuCCrgsWz8wxMXUS9Tb9iVMvcRbvFcAHGkMD5Kx8koh4GquNGNTfohfk7pgjhaPCdXpoba",
    P2SH_P2WPKH: "tpubDD7tXK8KeQ3YY83yWq755fHY2JW8Ha8Q765tknUM5rSvjPcGWfUppDFMpQ1ScziKfW3ZNtZvAD7M3u7bSs7HofjTD3KP3YxPK7X6hwV8Rk2",
    P2WPKH: "tpubDC8msFGeGuwnKG9Upg7DM2b4DaRqg3CUZa5g8v2SRQ6K4NSkxUgd7HsL2XVWbVm39yBA4LAxysQAm397zwQSQoQgewGiYZqrA9DsP4zbQ1M"
  },
}

const SLIP_132_EXTENEDED_PUB_KEY = {
  mainnet: {
    P2PKH: "xpub6BosfCnifzxcFwrSzQiqu2DBVTshkCXacvNsWGYJVVhhawA7d4R5WSWGFNbi8Aw6ZRc1brxMyWMzG3DSSSSoekkudhUd9yLb6qx39T9nMdj",
    P2SH_P2WPKH: "ypub6Ww3ibxVfGzLrAH1PNcjyAWenMTbbAosGNB6VvmSEgytSER9azLDWCxoJwW7Ke7icmizBMXrzBx9979FfaHxHcrArf3zbeJJJUZPf663zsP",
    P2WPKH: "zpub6rFR7y4Q2AijBEqTUquhVz398htDFrtymD9xYYfG1m4wAcvPhXNfE3EfH1r1ADqtfSdVCToUG868RvUUkgDKf31mGDtKsAYz2oz2AGutZYs"
  },
  testnet: {
    P2PKH: "tpubDC5FSnBiZDMmhiuCmWAYsLwgLYrrT9rAqvTySfuCCrgsWz8wxMXUS9Tb9iVMvcRbvFcAHGkMD5Kx8koh4GquNGNTfohfk7pgjhaPCdXpoba",
    P2SH_P2WPKH: "upub5EFU65HtV5TeiSHmZZm7FUffBGy8UKeqp7vw43jYbvZPpoVsgU93oac7Wk3u6moKegAEWtGNF8DehrnHtv21XXEMYRUocHqguyjknFHYfgY",
    P2WPKH: "vpub5Y6cjg78GGuNLsaPhmYsiw4gYX3HoQiRBiSwDaBXKUafCt9bNwWQiitDk5VZ5BVxYnQdwoTyXSs2JHRPAgjAvtbBrf8ZhDYe2jWAqvZVnsc"
  },
}

describe('xpubConverter', () => {
  describe('mainnet', () => {
    it('should convert bip32 P2PKH xpub to slip132 xpub', () => {
      expect(convertXpub(BIP_32_EXTENDED_PUB_KEY.mainnet.P2PKH, ScriptType.P2PKH, networks.bitcoin)).toBe(SLIP_132_EXTENEDED_PUB_KEY.mainnet.P2PKH)
    })

    it('should convert bip32 P2SH-P2WPKH xpub to slip132 ypub', () => {
      expect(convertXpub(BIP_32_EXTENDED_PUB_KEY.mainnet.P2SH_P2WPKH, ScriptType.P2SH_P2WPKH, networks.bitcoin)).toBe(SLIP_132_EXTENEDED_PUB_KEY.mainnet.P2SH_P2WPKH)
    })

    it('should convert bip32 P2WPKH xpub to zpub', () => {
      expect(convertXpub(BIP_32_EXTENDED_PUB_KEY.mainnet.P2WPKH, ScriptType.P2WPKH, networks.bitcoin)).toBe(SLIP_132_EXTENEDED_PUB_KEY.mainnet.P2WPKH)
    })
  })

  describe('Testnet', () => {
    it('should convert bip32 P2PKH xpub to slip132 xpub', () => {
      expect(convertXpub(BIP_32_EXTENDED_PUB_KEY.testnet.P2PKH, ScriptType.P2PKH, networks.regtest)).toBe(SLIP_132_EXTENEDED_PUB_KEY.testnet.P2PKH)
    })

    it('should convert bip32 P2SH-P2WPKH xpub to slip132 upub', () => {
      expect(convertXpub(BIP_32_EXTENDED_PUB_KEY.testnet.P2SH_P2WPKH, ScriptType.P2SH_P2WPKH, networks.regtest)).toBe(SLIP_132_EXTENEDED_PUB_KEY.testnet.P2SH_P2WPKH)
    })

    it('should convert bip32 P2WPKH xpub to vpub', () => {
      expect(convertXpub(BIP_32_EXTENDED_PUB_KEY.testnet.P2WPKH, ScriptType.P2WPKH, networks.regtest)).toBe(SLIP_132_EXTENEDED_PUB_KEY.testnet.P2WPKH)
    })
  });
})