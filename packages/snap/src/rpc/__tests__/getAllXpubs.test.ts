import { networks } from 'bitcoinjs-lib';
import { ScriptType } from '../../interface';
import { getAllXpubs, getExtendedPublicKey } from '../../rpc';
import { SnapMock } from '../__mocks__/snap';
import { bip44 } from './fixtures/bitcoinNode';

describe('getAllXpubs', () => {
  const domain = 'btc.justsnap.io';
  const snapStub = new SnapMock();

  afterEach(() => {
    snapStub.reset();
  });

  beforeEach(() => {
    snapStub.rpcStubs.snap_manageState.mockResolvedValue(bip44.slip10Node.parentFingerprint.toString(16).padStart(8, '0'));
  });

  it('should get all 6 extended public keys from wallet if user approve', async () => {
    snapStub.rpcStubs.snap_dialog.mockResolvedValue(true);
    snapStub.rpcStubs.snap_getBip32Entropy.mockResolvedValue(bip44.slip10Node);
    const {xpubs} = await getAllXpubs(domain, snapStub);

    expect(snapStub.rpcStubs.snap_getBip32Entropy).toBeCalledTimes(6);
    expect(xpubs).toEqual(expect.arrayContaining([
      expect.stringMatching(/^xpub/),
      expect.stringMatching(/^ypub/),
      expect.stringMatching(/^zpub/),
      expect.stringMatching(/^tpub/),
      expect.stringMatching(/^upub/),
      expect.stringMatching(/^vpub/),
    ]));
  });

  it('should raise error if user reject', async () => {
    snapStub.rpcStubs.snap_dialog.mockResolvedValue(false);

    await expect(getExtendedPublicKey(domain, snapStub, ScriptType.P2PKH, networks.regtest))
      .rejects
      .toThrowError('User reject to access the key');
    expect(snapStub.rpcStubs.snap_getBip32Entropy).not.toBeCalled();
  });
});
