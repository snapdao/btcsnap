import { renderHooksWithContext, defaultStore } from '../../__tests__/utils/renderHookWithContext';
import { useTopUpAddress } from '../useTopUpAddress';

const getBtcResponse = [
  {
    address: 'bc156516156dfsoiadfsoiafsp'
  }
];

jest.mock('../../api/lightning/getBtc', () => ({
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
        settings: { dynamicAddress: false },
      };

      const { result, waitForNextUpdate } = renderHooksWithContext(() => useTopUpAddress(), store);

      await waitForNextUpdate();
      expect(result.current.address).toStrictEqual(getBtcResponse.at(0)?.address);
    });
  });

  it('should return empty address when lightning.current does not exist ', async () => {
    const store = {
      ...defaultStore,
      lightning: {
        ...defaultStore.lightning,
        current: undefined,
      },
    };
    const { result } = renderHooksWithContext(() => useTopUpAddress(), store as any);

    expect(result.current.address).toEqual('');
  });
});
