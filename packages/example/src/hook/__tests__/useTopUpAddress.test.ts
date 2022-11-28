import { renderHooksWithContext, defaultStore } from '../../__tests__/utils/renderHookWithContext';
import { useTopUpAddress } from '../useTopUpAddress';
import * as snap from '../../lib/snap';

const getBtcResponse = [
  {
    address: 'bc156516156dfsoiadfsoiafsp'
  }
];

jest.mock('../../api/v1/getBtc', () => ({
  getBtc: jest.fn().mockResolvedValue(Promise.resolve(getBtcResponse))
}));

jest.mock('../../services/LightningService/getUserInfo', () => ({
  getPassword: jest.fn().mockResolvedValue(Promise.resolve('ldfsoisadfoiadfsoiodfshioadfshidfsahi'))
}));

describe('useTopUpAddress', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('address', () => {
    it('should return address from remote api', async() => {
      const store  = {
        ...defaultStore,
        settings: { dynamicAddress: false},
      };

      const { result, waitForNextUpdate } = renderHooksWithContext(() => useTopUpAddress(), store);

      await waitForNextUpdate();
      expect(result.current).toEqual({ address: getBtcResponse.at(0)?.address, loading: false });
    });
  });

  it('should return empty address when lightning.current does not exist ', async () => {
    const store = {
      ...defaultStore,
      lightning: {
        ...defaultStore.lightning,
        current: {},
      },
    };
    const { result, waitForNextUpdate } = renderHooksWithContext(() => useTopUpAddress(), store as any);

    await waitForNextUpdate();
    expect(result.current).toEqual({
      address: '',
      loading: false,
    });
  });
});
