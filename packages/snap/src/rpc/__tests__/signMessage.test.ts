import {SnapMock} from '../__mocks__/snap';
import {signMessage} from '../signMessage';
import * as bitcoinMessage from 'bitcoinjs-message';
import {bip44} from './fixtures/bitcoinNode';

describe('signMessage', () => {
  const snapStub = new SnapMock();
  const domain = 'www.justsnap.io';
  const message = 'test message';

  beforeEach(() => {
    snapStub.rpcStubs.snap_manageState.mockResolvedValue({network: 'test'});
  });

  afterEach(() => {
    snapStub.reset();
  });

  it('should sign message using ECDSA', async () => {
    snapStub.rpcStubs.snap_dialog.mockResolvedValue(true);
    snapStub.rpcStubs.snap_getBip32Entropy.mockResolvedValue(bip44.slip10Node);

    const result = await signMessage(domain, snapStub, message);

    expect(
      bitcoinMessage.verify(message, result.address, result.signature),
    ).toBeTruthy();
  });

  it('should reject the sign request and throw error if user reject the sign message request', async () => {
    snapStub.rpcStubs.snap_dialog.mockResolvedValue(false);

    await expect(
       signMessage(domain, snapStub, message, 'ecdsa'),
    ).rejects.toThrowError('User reject the sign request');
  });


  it('should throw error if protocol is not supported', async () => {
    await expect(
      signMessage(domain, snapStub, message, 'bip322'),
    ).rejects.toThrowError('Action not supported');
  });

  it("should return valid address if network is mainnet", async () => {
    snapStub.rpcStubs.snap_dialog.mockResolvedValue(true);
    snapStub.rpcStubs.snap_getBip32Entropy.mockResolvedValue(bip44.slip10Node);
    snapStub.rpcStubs.snap_manageState.mockResolvedValue({network: 'main'});

    const result = await signMessage(domain, snapStub, message);

    expect(result.address.startsWith('3')).toBeTruthy();
  });

  it("should return valid address if network is testnet", async () => {
    snapStub.rpcStubs.snap_dialog.mockResolvedValue(true);
    snapStub.rpcStubs.snap_getBip32Entropy.mockResolvedValue(bip44.slip10Node);
    snapStub.rpcStubs.snap_manageState.mockResolvedValue({network: 'test'});

    const result = await signMessage(domain, snapStub, message);

    expect(result.address.startsWith('2')).toBeTruthy();
  });
});
