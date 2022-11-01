import { WalletMock } from "../__mocks__/wallet";
import { getLNDataFromSnap } from "../getLNDataFromSnap";
import { KeyOptions } from "../../interface";
import { bip44, LNDataFromSnap, LNDataToSnap } from "./fixtures/bitcoinNode";

describe('getLNDataFromSnap', () => {
  const walletStub = new WalletMock();

  afterEach(() => {
    walletStub.reset()
  })

  it(`should return the password if user use the 'Password' key`, async () => {
    const key = KeyOptions.Password;
    walletStub.rpcStubs.snap_manageState.mockResolvedValue(LNDataFromSnap);
    expect(await getLNDataFromSnap(LNDataToSnap.domain, walletStub, LNDataToSnap.walletId, key)).toBe('ln_password_1');
    expect(walletStub.rpcStubs.snap_manageState).toBeCalledTimes(1);
  })

  it(`should return credential and password if user use the 'Credential' key`, async () => {
    const key = KeyOptions.Credential;
    walletStub.rpcStubs.snap_confirm.mockResolvedValue(true);
    walletStub.rpcStubs.snap_manageState.mockResolvedValue(LNDataFromSnap);
    walletStub.rpcStubs.snap_getBip32Entropy.mockResolvedValue(bip44.slip10Node);
    await getLNDataFromSnap(LNDataToSnap.domain, walletStub, LNDataToSnap.walletId, key);
    expect(walletStub.rpcStubs.snap_confirm).toBeCalledTimes(1);
    expect(walletStub.rpcStubs.snap_manageState).toBeCalledTimes(1);
  })

  it('should throw error if user use the wrong key', async () => {
    const key = 'wrongKey'
    walletStub.rpcStubs.snap_confirm.mockResolvedValue(true);

    await expect(getLNDataFromSnap(LNDataToSnap.domain, walletStub, LNDataToSnap.walletId, key))
      .rejects
      .toThrowError('Key cannot be recognized');
    expect(walletStub.rpcStubs.snap_getBip32Entropy).not.toHaveBeenCalled();
  })

  it('should throw error if user reject to access the lightning key', async () => {
    const key = KeyOptions.Credential;
    walletStub.rpcStubs.snap_confirm.mockResolvedValue(false);

    await expect(getLNDataFromSnap(LNDataToSnap.domain, walletStub, LNDataToSnap.walletId, key))
      .rejects
      .toThrowError('User reject to access the key');
    expect(walletStub.rpcStubs.snap_getBip32Entropy).not.toHaveBeenCalled();
  })
})
