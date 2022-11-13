import { act } from '@testing-library/react-hooks';
import { useBalance } from '../useBalance';
import {
  renderHooksWithContext,
} from '../../__tests__/utils/renderHookWithContext';
import { waitFor } from '@testing-library/react';
import { queryCoinV2 } from "../../api";

jest.mock('../../api', () => ({
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
    });
  });

  it('should return balance as 0 when current does not exist', async () => {
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
      }),
    );
    expect(queryCoinV2).not.toBeCalled();
  });

  it('should be able to refresh balance', async () => {
    const { result, waitForNextUpdate } = renderHooksWithContext(() => useBalance());
    await waitForNextUpdate();
    expect(queryCoinV2).toBeCalledTimes(1);

    act(() => {
      result.current.refresh();
    });
    await waitForNextUpdate();
    expect(queryCoinV2).toBeCalledTimes(2);
  });
});
