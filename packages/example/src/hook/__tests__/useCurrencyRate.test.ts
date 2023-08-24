import { act } from '@testing-library/react-hooks';
import { useCurrencyRate } from '../useCurrencyRate';
import {
  defaultStore,
  renderHooksWithContext,
} from '../../__tests__/utils/renderHookWithContext';
import { queryAssetRate } from '../../api';

jest.mock('../../api/v1/assetRate', () => ({
  queryAssetRate: jest.fn().mockResolvedValue({
    rates: [
      {
        "coin": "BTC_LEGACY",
        "rate": 26427.52415867722
      },
      {
        "coin": "BTC_TESTNET_NATIVE_SEGWIT",
        "rate": 26427.52415867722
      }
    ]
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
    expect(defaultStore.runtime.setCurrencyRate).toBeCalledWith(26427.52415867722);
  });

  it('should set currencyRate as 0 when current does not exist', async () => {
    const store = {
      current: undefined,
      runtime: {
        setStatus: jest.fn(),
      },
    };
    renderHooksWithContext(() => useCurrencyRate(), store as any);

    expect(queryAssetRate).not.toBeCalled();
    expect(defaultStore.runtime.setCurrencyRate).not.toBeCalled();
  });

  it('should be able to refresh balance', async () => {
    const { result, waitForNextUpdate } = renderHooksWithContext(() => useCurrencyRate());
    await waitForNextUpdate();
    expect(queryAssetRate).toBeCalledTimes(1);
    expect(defaultStore.runtime.setCurrencyRate).toBeCalledTimes(1);

    act(() => {
      result.current.refreshCurrencyRate();
    });
    await waitForNextUpdate();
    expect(queryAssetRate).toBeCalledTimes(2);
    expect(defaultStore.runtime.setCurrencyRate).toBeCalledTimes(2);
  });
});
