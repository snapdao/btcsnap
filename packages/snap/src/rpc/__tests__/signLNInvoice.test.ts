import { signLNInvoice } from '../signLNInvoice';
import { WalletMock } from '../__mocks__/wallet';
import { bip44, LNDataToSnap, LNSignature } from "./fixtures/bitcoinNode";

describe('signLNInvoice', () => {
  const walletStub = new WalletMock();

  afterEach(() => {
    walletStub.reset()
  })

  it('should return signature if user sign the lightning invoice', async () => {
    walletStub.rpcStubs.snap_confirm.mockResolvedValue(true);
    walletStub.rpcStubs.snap_getBip32Entropy.mockResolvedValue(bip44.slip10Node);
    const signature = await signLNInvoice(LNDataToSnap.domain, walletStub, LNDataToSnap.invoice);
    expect(signature).toBe(LNSignature.signature);
  })

  it('should reject the sign request and throw error if user reject the sign the lightning invoice', async () => {
    walletStub.rpcStubs.snap_confirm.mockResolvedValue(false);

    await expect(signLNInvoice(LNDataToSnap.domain, walletStub, LNDataToSnap.invoice))
      .rejects
      .toThrowError('User reject the sign request');
  })
});
