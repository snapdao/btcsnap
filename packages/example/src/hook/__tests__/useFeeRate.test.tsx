import { useFeeRate } from '../useFeeRate';
import { act } from '@testing-library/react-hooks';
import * as api from '../../api/v1/feeRate';
import {
  renderHooksWithContext,
} from '../../__tests__/utils/renderHookWithContext';

jest.mock('../../api/v1/feeRate', () => ({
  queryFeeRate: jest.fn().mockResolvedValue({
    feeEstimation: {
      feeRate: {
        30: 49460,
        60: 32581,
        70: 9062,
      },
      feeType: 'BTCish',
      feeCoin: 'BTC_TESTNET',
    },
  }),
}));

describe('useFeeRate', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return fee rate from current account', async () => {
    const { result, waitForNextUpdate } = renderHooksWithContext(() =>
      useFeeRate(),
    );
    await waitForNextUpdate();
    expect(result.current).toMatchObject({
      feeRate: {
        low: 9,
        recommended: 32,
        high: 48,
      },
    });
  });

  it('should be able to refresh fee rate', async () => {
    const { result, waitForNextUpdate } = renderHooksWithContext(() =>
      useFeeRate(),
    );
    await waitForNextUpdate();
    expect(api.queryFeeRate).toBeCalledTimes(1);

    act(() => {
      result.current.refresh();
    });
    await waitForNextUpdate();
    expect(api.queryFeeRate).toBeCalledTimes(2);
  });
});
