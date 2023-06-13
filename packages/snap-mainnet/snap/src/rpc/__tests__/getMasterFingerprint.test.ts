import { getMasterFingerprint } from "../getMasterFingerprint";
import { SnapMock } from "../__mocks__/snap";
import { bip44 } from './fixtures/bitcoinNode';

describe('getMasterFingerprint', () => {
  const snapStub = new SnapMock();
  const mfp = '73c5da0a';

  afterEach(() => {
    snapStub.reset();
  })

  describe("getMasterFingerprint", () => {
    it('should return masterFingerprint if it exists', async () => {
      snapStub.rpcStubs.snap_getBip32Entropy.mockResolvedValue(bip44.slip10Node);

      const xfp = await getMasterFingerprint(snapStub)
      expect(xfp).toBe(mfp)
    })

    it("should return undefined string if mfp doesn't exist", async () => {
      const {masterFingerprint, ...slip10NodeWithoutMFP} = bip44.slip10Node
      snapStub.rpcStubs.snap_getBip32Entropy.mockResolvedValue(slip10NodeWithoutMFP);

      const xfp = await getMasterFingerprint(snapStub)
      expect(xfp).toBeUndefined();
    })
  })
});
