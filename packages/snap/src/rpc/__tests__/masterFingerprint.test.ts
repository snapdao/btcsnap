import { getMasterFingerprint, masterFingerprint, updateMasterFingerprintWithXpub } from "../masterFingerprint";
import { WalletMock } from "../__mocks__/wallet";
import { bip44 } from "./fixtures/bitcoinNode";

describe('masterFingerprint', () => {
  const walletStub = new WalletMock();
  const mfp = bip44.slip10Node.parentFingerprint.toString(16);
  const network = 'test';

  afterEach(() => {
    walletStub.reset();
  })
  
  describe("getMasterFingerprint", () => {
    it('should return masterFingerprint if it exists', async () => {
      walletStub.rpcStubs.snap_manageState.mockResolvedValue({mfp, network});

      const xfp = await masterFingerprint(walletStub, "get")
      expect(xfp).toBe(mfp)
    })
    
    it("should return empty string if mfp doesn't exist", async () => {
      walletStub.rpcStubs.snap_manageState.mockResolvedValue(undefined);

      const xfp = await masterFingerprint(walletStub, "get")
      expect(xfp).toBe("")
    })

    it("should throw error if action doesn't exist", async () => {
      walletStub.rpcStubs.snap_manageState.mockResolvedValue(undefined);

      await expect(masterFingerprint(walletStub, "fetch" as any))
        .rejects
        .toThrowError("Action not exist");
    })
  })

  describe('updateMasterFingerprintWithXpub', function () {
    it("should update mfp with first 4 bytes of xpub sha256 hash", async () => {
      jest.spyOn(walletStub, "request");
      walletStub.rpcStubs.snap_manageState.mockResolvedValue(undefined);
      const xpub = "tpubDC5FSnBiZDMmhiuCmWAYsLwgLYrrT9rAqvTySfuCCrgsWz8wxMXUS9Tb9iVMvcRbvFcAHGkMD5Kx8koh4GquNGNTfohfk7pgjhaPCdXpoba"
      
      const xfp = await updateMasterFingerprintWithXpub(walletStub, xpub)
      expect(xfp).toBe("51d883fc")
      expect(walletStub.request).toBeCalledWith({"method": "snap_manageState", "params": ["update", {"mfp": "51d883fc"}]})
    })
  });

  describe("clearMasterFingerprint", () => {
    it('should set masterFingerprint as empty', async () => {
      jest.spyOn(walletStub, "request");
      await masterFingerprint(walletStub, "clear");

      expect(walletStub.request).toBeCalledWith({"method": "snap_manageState", "params": ["update", {"mfp": ""}]})
    })
  })
  
});
