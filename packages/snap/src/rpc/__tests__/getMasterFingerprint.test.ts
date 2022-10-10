import { getMasterFingerprint } from "../getMasterFingerprint";
import { WalletMock } from "../__mocks__/wallet";
import { bip44 } from './fixtures/bitcoinNode';

describe('getMasterFingerprint', () => {
  const walletStub = new WalletMock();
  const mfp = '73c5da0a';

  afterEach(() => {
    walletStub.reset();
  })

  describe("getMasterFingerprint", () => {
    it('should return masterFingerprint if it exists', async () => {
      walletStub.rpcStubs.snap_getBip32Entropy.mockResolvedValue(bip44.slip10Node);

      const xfp = await getMasterFingerprint(walletStub)
      expect(xfp).toBe(mfp)
    })

    it("should return undefined string if mfp doesn't exist", async () => {
      const {masterFingerprint, ...slip10NodeWithoutMFP} = bip44.slip10Node
      walletStub.rpcStubs.snap_getBip32Entropy.mockResolvedValue(slip10NodeWithoutMFP);

      const xfp = await getMasterFingerprint(walletStub)
      expect(xfp).toBeUndefined();
    })
  })
});
