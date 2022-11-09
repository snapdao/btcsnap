import { act } from '@testing-library/react-hooks';
import { useBalance } from '../useBalance';
import {
  defaultStore,
  renderHooksWithContext,
} from '../../__tests__/utils/renderHookWithContext';
import { queryCoinV1 } from '../../api/v1/coin';
import { waitFor } from '@testing-library/react';

jest.mock('../../api/v1/coin', () => ({
  queryCoinV1: jest.fn().mockResolvedValue({
    coins: {
      BTC_TESTNET_NATIVE_SEGWIT: {
        coinInfo: {
          assetCoin: 'BTC_TESTNET_NATIVE_SEGWIT',
          chainCoin: 'BTC_TESTNET' as any,
          name: 'Bitcoin Testnet Native Segwit',
          decimal: 8,
          rate: '19056.42',
        },
      },
    },
  }),
}));

jest.mock('../../api/v2/coin', () => ({
  queryCoinV2: jest.fn().mockResolvedValue({
    coins: {
      BTC_TESTNET_NATIVE_SEGWIT: {
        decimal: 8,
        balance: '4',
      },
    },
  }),
}));

describe('useBalance', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return balance from current account', async () => {
    const { result, waitForNextUpdate } = renderHooksWithContext(() =>
      useBalance(),
    );
    await waitForNextUpdate();
    expect(result.current).toMatchObject({
      balance: 4,
      rate: 19056.42,
    });
  });

  it('should return balance and rate as 0 when current does not exist', async () => {
    const store = {
      current: undefined,
      runtime: {
        setStatus: jest.fn(),
      },
    };
    const { result } = renderHooksWithContext(() => useBalance(), store as any);

    await waitFor(() =>
      expect(result.current).toMatchObject({
        balance: 0,
        rate: 0,
      }),
    );
    expect(queryCoinV1).not.toBeCalled();
  });

  it('should be able to refresh balance', async () => {
    const { result, waitForNextUpdate } = renderHooksWithContext(useBalance);
    await waitForNextUpdate();
    expect(queryCoinV1).toBeCalledTimes(1);

    act(() => {
      result.current.refresh();
    });
    await waitForNextUpdate();
    expect(queryCoinV1).toBeCalledTimes(2);
  });
});
