import { networks } from "bitcoinjs-lib";
import { ScriptType } from "../../interface";
import { getExtendedPublicKey } from "../../rpc";
import { SnapMock } from "../__mocks__/snap";
import { bip44 } from "./fixtures/bitcoinNode";

describe('getExtendedPublicKey', () => {
  const domain = 'www.justsnap.io'
  const snapStub = new SnapMock();

  afterEach(() => {
    snapStub.reset()
  })

  beforeEach(() => {
    snapStub.rpcStubs.snap_manageState.mockResolvedValue(bip44.slip10Node.parentFingerprint.toString(16).padStart(8, '0'));
  })

  it('should get extended public key from wallet if user approve', async () => {
    snapStub.rpcStubs.snap_dialog.mockResolvedValue(true);
    snapStub.rpcStubs.snap_getBip32Entropy.mockResolvedValue(bip44.slip10Node);

    const {xpub} = await getExtendedPublicKey(domain, snapStub, ScriptType.P2PKH, networks.bitcoin)

    expect(snapStub.rpcStubs.snap_getBip32Entropy).toBeCalledTimes(1);
    expect(xpub).toBe(bip44.xpub)
  })

  it('should raise error if user reject', async () => {
    snapStub.rpcStubs.snap_dialog.mockResolvedValue(false);

    await expect(getExtendedPublicKey(domain, snapStub, ScriptType.P2PKH, networks.regtest))
      .rejects
      .toThrowError('User reject to access the key');
    expect(snapStub.rpcStubs.snap_getBip32Entropy).not.toBeCalled();
  })

  it('should raise error if script type not supported', async () => {
    snapStub.rpcStubs.snap_dialog.mockResolvedValue(true);

    await expect(getExtendedPublicKey(domain, snapStub, "p2sh" as ScriptType, networks.regtest))
      .rejects
      .toThrowError('ScriptType is not supported.');
    expect(snapStub.rpcStubs.snap_getBip32Entropy).not.toBeCalled();
  })
});
