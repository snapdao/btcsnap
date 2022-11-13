import { act } from '@testing-library/react-hooks';
import { useCurrencyRate } from '../useCurrencyRate';
import {
  defaultStore,
  renderHooksWithContext,
} from '../../__tests__/utils/renderHookWithContext';
import { queryCoinV1 } from '../../api';
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

describe('useCurrencyRate', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should set currencyRate given current account exist', async () => {
    const { waitForNextUpdate } = renderHooksWithContext(() =>
      useCurrencyRate(),
    );
    await waitForNextUpdate();
    expect(defaultStore.runtime.setCurrencyRate).toBeCalledWith(19056.42);
  });

  it('should set currencyRate as 0 when current does not exist', async () => {
    const store = {
      current: undefined,
      runtime: {
        setStatus: jest.fn(),
      },
    };
    renderHooksWithContext(() => useCurrencyRate(), store as any);

    expect(queryCoinV1).not.toBeCalled();
    expect(defaultStore.runtime.setCurrencyRate).not.toBeCalled();
  });

  it('should be able to refresh balance', async () => {
    const { result, waitForNextUpdate } = renderHooksWithContext(() => useCurrencyRate());
    await waitForNextUpdate();
    expect(queryCoinV1).toBeCalledTimes(1);
    expect(defaultStore.runtime.setCurrencyRate).toBeCalledTimes(1);

    act(() => {
      result.current.refreshCurrencyRate();
    });
    await waitForNextUpdate();
    expect(queryCoinV1).toBeCalledTimes(2);
    expect(defaultStore.runtime.setCurrencyRate).toBeCalledTimes(2);
  });
});
