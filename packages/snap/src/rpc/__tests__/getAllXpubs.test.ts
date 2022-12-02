import { networks } from 'bitcoinjs-lib';
import { ScriptType } from '../../interface';
import { getAllXpubs, getExtendedPublicKey } from '../../rpc';
import { WalletMock } from '../__mocks__/wallet';
import { bip44 } from './fixtures/bitcoinNode';

describe('getAllXpubs', () => {
  const domain = 'btc.justsnap.io';
  const walletStub = new WalletMock();

  afterEach(() => {
    walletStub.reset();
  });

  beforeEach(() => {
    walletStub.rpcStubs.snap_manageState.mockResolvedValue(bip44.slip10Node.parentFingerprint.toString(16));
  });

  it('should get all 6 extended public keys from wallet if user approve', async () => {
    walletStub.rpcStubs.snap_confirm.mockResolvedValue(true);
    walletStub.rpcStubs.snap_getBip32Entropy.mockResolvedValue(bip44.slip10Node);
    const {xpubs} = await getAllXpubs(domain, walletStub);

    expect(walletStub.rpcStubs.snap_getBip32Entropy).toBeCalledTimes(6);
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
    walletStub.rpcStubs.snap_confirm.mockResolvedValue(false);

    await expect(getExtendedPublicKey(domain, walletStub, ScriptType.P2PKH, networks.regtest))
      .rejects
      .toThrowError('User reject to access the key');
    expect(walletStub.rpcStubs.snap_getBip32Entropy).not.toBeCalled();
  });
});
