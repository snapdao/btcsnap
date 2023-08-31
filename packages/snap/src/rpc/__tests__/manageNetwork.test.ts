import { SnapMock } from '../__mocks__/snap';
import { bip44 } from './fixtures/bitcoinNode';
import { manageNetwork } from '../manageNetwork';
import * as manageState from '../../utils/manageState';
import { BitcoinNetwork } from '../../interface';

// jest.mock('../../utils/manageState', () => {});

describe('masterFingerprint', () => {
  const snapStub = new SnapMock();
  const mfp = bip44.slip10Node.parentFingerprint.toString(16).padStart(8, '0');
  const network = 'test';
  const origin = 'www.justsnap.io'

  afterEach(() => {
    snapStub.reset();
    jest.clearAllMocks();
  })

  describe("manageNetwork", () => {
    it('should return network if it exists', async () => {
      snapStub.rpcStubs.snap_manageState.mockResolvedValue({mfp, network});

      const storedNetwork = await manageNetwork(origin, snapStub, "get");
      expect(storedNetwork).toBe('test')
    })

    it("should return empty string if network doesn't exist", async () => {
      snapStub.rpcStubs.snap_manageState.mockResolvedValue({mfp});

      const storedNetwork = await manageNetwork(origin, snapStub, "get")
      expect(storedNetwork).toBe("")
    })

    it("should throw error if action doesn't exist", async () => {
      snapStub.rpcStubs.snap_manageState.mockResolvedValue(undefined);

      await expect(manageNetwork(origin, snapStub, "fetch" as any))
        .rejects
        .toThrowError("Action not supported");
    })

    it("should set network to target when user approves given target network", async () => {
      snapStub.rpcStubs.snap_manageState.mockResolvedValue({mfp, network});
      snapStub.rpcStubs.snap_dialog.mockResolvedValue(true);
      jest.spyOn(manageState, 'updatePersistedData');
      await manageNetwork(origin, snapStub, "set", BitcoinNetwork.Main);

      expect(manageState.updatePersistedData).toBeCalledWith(snapStub, 'network', 'main');
    })

    it("should not set network to target when user not approve given target network", async () => {
      snapStub.rpcStubs.snap_manageState.mockResolvedValue({mfp, network});
      snapStub.rpcStubs.snap_dialog.mockResolvedValue(false);
      jest.spyOn(manageState, 'updatePersistedData');
      await manageNetwork(origin, snapStub, "set", BitcoinNetwork.Main);

      expect(manageState.updatePersistedData).not.toBeCalled();
    })
  })
});
