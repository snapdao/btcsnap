import { signLNInvoice } from '../signLNInvoice';
import { SnapMock } from '../__mocks__/snap';
import { bip44, LNDataToSnap, LNSignature } from "./fixtures/bitcoinNode";

describe('signLNInvoice', () => {
  const snapStub = new SnapMock();

  afterEach(() => {
    snapStub.reset()
  })

  it('should return signature if user sign the lightning invoice', async () => {
    snapStub.rpcStubs.snap_dialog.mockResolvedValue(true);
    snapStub.rpcStubs.snap_getBip32Entropy.mockResolvedValue(bip44.slip10Node);
    const signature = await signLNInvoice(LNDataToSnap.domain, snapStub, LNDataToSnap.invoice);
    expect(signature).toBe(LNSignature.signature);
  })

  it('should reject the sign request and throw error if user reject the sign the lightning invoice', async () => {
    snapStub.rpcStubs.snap_dialog.mockResolvedValue(false);

    await expect(signLNInvoice(LNDataToSnap.domain, snapStub, LNDataToSnap.invoice))
      .rejects
      .toThrowError('User reject the sign request');
  })
});
