import {SnapMock} from '../__mocks__/snap';
import {getLNDataFromSnap} from '../getLNDataFromSnap';
import {KeyOptions} from '../../interface';
import {bip44, LNDataFromSnap, LNDataToSnap} from './fixtures/bitcoinNode';

describe('getLNDataFromSnap', () => {
  const snapStub = new SnapMock();

  afterEach(() => {
    snapStub.reset();
  });

  it(`should return the password if user use the 'Password' key`, async () => {
    const key = KeyOptions.Password;
    snapStub.rpcStubs.snap_manageState.mockResolvedValue(LNDataFromSnap);
    expect(
      await getLNDataFromSnap(
        LNDataToSnap.domain,
        snapStub,
        {
          key,
          walletId: LNDataToSnap.walletId,
        }
      ),
    ).toBe('ln_password_1');
    expect(snapStub.rpcStubs.snap_manageState).toBeCalledTimes(1);
  });

  it(`should return credential and password if user use the 'Credential' key`, async () => {
    const key = KeyOptions.Credential;
    snapStub.rpcStubs.snap_dialog.mockResolvedValue(true);
    snapStub.rpcStubs.snap_manageState.mockResolvedValue(LNDataFromSnap);
    snapStub.rpcStubs.snap_getBip32Entropy.mockResolvedValue(
      bip44.slip10Node,
    );
    await getLNDataFromSnap(
      LNDataToSnap.domain,
      snapStub,
      {
        key,
        walletId: LNDataToSnap.walletId,
      }
    );
    expect(snapStub.rpcStubs.snap_dialog).toBeCalledTimes(1);
    expect(snapStub.rpcStubs.snap_manageState).toBeCalledTimes(1);
  });

  it('should throw error if user use the wrong key', async () => {
    const key = 'wrongKey' as any;
    snapStub.rpcStubs.snap_dialog.mockResolvedValue(true);

    await expect(
      getLNDataFromSnap(
        LNDataToSnap.domain,
        snapStub,
        {
          key,
          walletId: LNDataToSnap.walletId,
        }
      ),
    ).rejects.toThrowError('Key cannot be recognized');
    expect(snapStub.rpcStubs.snap_getBip32Entropy).not.toHaveBeenCalled();
  });

  it('should throw error if user reject to access the lightning key', async () => {
    const key = KeyOptions.Credential;
    snapStub.rpcStubs.snap_dialog.mockResolvedValue(false);

    await expect(
      getLNDataFromSnap(
        LNDataToSnap.domain,
        snapStub,
        {
          key,
          walletId: LNDataToSnap.walletId,
        }
      ),
    ).rejects.toThrowError('User rejected the request.');
    expect(snapStub.rpcStubs.snap_getBip32Entropy).not.toHaveBeenCalled();
  });
});
