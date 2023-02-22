import { SnapMock } from "../__mocks__/snap";
import { saveLNDataToSnap } from "../saveLNDataToSnap";
import { bip44, LNDataToSnap } from "./fixtures/bitcoinNode"

describe('saveLNDataToSnap', () => {
  const snapStub = new SnapMock();

  afterEach(() => {
    snapStub.reset()
  })

  it('should call snap_manageState twice if user save lightning data to Snap', async () => {
    snapStub.rpcStubs.snap_getBip32Entropy.mockResolvedValue(bip44.slip10Node);
    await saveLNDataToSnap(
      LNDataToSnap.domain,
      snapStub,
      LNDataToSnap.walletId,
      LNDataToSnap.credential,
      LNDataToSnap.password
    );
    expect(snapStub.rpcStubs.snap_getBip32Entropy).toBeCalledTimes(1);
    expect(snapStub.rpcStubs.snap_manageState).toBeCalledTimes(3);
  })
})
