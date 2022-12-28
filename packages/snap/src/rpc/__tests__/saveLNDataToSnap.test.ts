import { WalletMock } from "../__mocks__/wallet";
import { saveLNDataToSnap } from "../saveLNDataToSnap";
import { bip44, LNDataToSnap } from "./fixtures/bitcoinNode"

describe('saveLNDataToSnap', () => {
  const walletStub = new WalletMock();

  afterEach(() => {
    walletStub.reset()
  })

  it('should call snap_manageState twice if user save lightning data to Snap', async () => {
    walletStub.rpcStubs.snap_getBip32Entropy.mockResolvedValue(bip44.slip10Node);
    await saveLNDataToSnap(
      LNDataToSnap.domain,
      walletStub,
      LNDataToSnap.walletId,
      LNDataToSnap.credential,
      LNDataToSnap.password
    );
    expect(walletStub.rpcStubs.snap_getBip32Entropy).toBeCalledTimes(1);
    expect(walletStub.rpcStubs.snap_manageState).toBeCalledTimes(3);
  })
})
