import { networks } from "bitcoinjs-lib";
import { ScriptType } from "../../interface";
import { getExtendedPublicKey } from "../../rpc";
import { WalletMock } from "../__mocks__/wallet";
import { bip44 } from "./fixtures/bitcoinNode";

describe('getExtendedPublicKey', () => {
  const domain = 'www.justsnap.io'
  const walletStub = new WalletMock();

  afterEach(() => {
    walletStub.reset()
  })

  beforeEach(() => {
    walletStub.rpcStubs.snap_manageState.mockResolvedValue(bip44.slip10Node.parentFingerprint.toString(16));
  })

  it('should get extended public key from wallet if user approve', async () => {
    walletStub.rpcStubs.snap_confirm.mockResolvedValue(true);
    walletStub.rpcStubs.snap_getBip32Entropy.mockResolvedValue(bip44.slip10Node);

    const {xpub} = await getExtendedPublicKey(domain, walletStub, ScriptType.P2PKH, networks.bitcoin)

    expect(walletStub.rpcStubs.snap_getBip32Entropy).toBeCalledTimes(1);
    expect(xpub).toBe(bip44.xpub)
  })

  it('should raise error if user reject', async () => {
    walletStub.rpcStubs.snap_confirm.mockResolvedValue(false);

    await expect(getExtendedPublicKey(domain, walletStub, ScriptType.P2PKH, networks.regtest))
      .rejects
      .toThrowError('User reject to access the key');
    expect(walletStub.rpcStubs.snap_getBip32Entropy).not.toBeCalled();
  })

  it('should raise error if script type not supported', async () => {
    walletStub.rpcStubs.snap_confirm.mockResolvedValue(true);

    await expect(getExtendedPublicKey(domain, walletStub, "p2sh" as ScriptType, networks.regtest))
      .rejects
      .toThrowError('ScriptType is not supported.');
    expect(walletStub.rpcStubs.snap_getBip32Entropy).not.toBeCalled();
  })
});
