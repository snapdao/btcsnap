import { WalletMock } from '../__mocks__/wallet';
import { bip44 } from './fixtures/bitcoinNode';
import { manageNetwork } from '../manageNetwork';
import * as manageState from '../../utils/manageState';
import { BitcoinNetwork } from '../../interface';

// jest.mock('../../utils/manageState', () => {});

describe('masterFingerprint', () => {
  const walletStub = new WalletMock();
  const mfp = bip44.slip10Node.parentFingerprint.toString(16);
  const network = 'test';
  const origin = 'www.justsnap.io'

  afterEach(() => {
    walletStub.reset();
    jest.clearAllMocks();
  })

  describe("manageNetwork", () => {
    it('should return network if it exists', async () => {
      walletStub.rpcStubs.snap_manageState.mockResolvedValue({mfp, network});

      const storedNetwork = await manageNetwork(origin, walletStub, "get");
      expect(storedNetwork).toBe('test')
    })

    it("should return empty string if network doesn't exist", async () => {
      walletStub.rpcStubs.snap_manageState.mockResolvedValue({mfp});

      const storedNetwork = await manageNetwork(origin, walletStub, "get")
      expect(storedNetwork).toBe("")
    })

    it("should throw error if action doesn't exist", async () => {
      walletStub.rpcStubs.snap_manageState.mockResolvedValue(undefined);

      await expect(manageNetwork(origin, walletStub, "fetch" as any))
        .rejects
        .toThrowError("Action not supported");
    })

    it("should set network to target when user approves given target network", async () => {
      walletStub.rpcStubs.snap_manageState.mockResolvedValue({mfp, network});
      walletStub.rpcStubs.snap_confirm.mockResolvedValue(true);
      jest.spyOn(manageState, 'updatePersistedData');
      await manageNetwork(origin, walletStub, "set", BitcoinNetwork.Main);

      expect(manageState.updatePersistedData).toBeCalledWith(walletStub, 'network', 'main');
    })

    it("should not set network to target when user not approve given target network", async () => {
      walletStub.rpcStubs.snap_manageState.mockResolvedValue({mfp, network});
      walletStub.rpcStubs.snap_confirm.mockResolvedValue(false);
      jest.spyOn(manageState, 'updatePersistedData');
      await manageNetwork(origin, walletStub, "set", BitcoinNetwork.Main);

      expect(manageState.updatePersistedData).not.toBeCalled();
    })
  })
});
