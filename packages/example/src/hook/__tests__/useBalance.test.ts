import { act } from '@testing-library/react-hooks';
import { useBalance } from '../useBalance';
import { defaultStore, renderHooksWithContext, } from '../../__tests__/utils/renderHookWithContext';
import { waitFor } from '@testing-library/react';
import { queryCoinV2 } from '../../api';
import { WalletType } from '../../interface';
import { balance as queryLightningBalance } from '../../api/lightning/balance';

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

jest.mock('../../api/lightning/balance', () => ({
  balance: jest.fn().mockResolvedValue({
    BTC: {
      AvailableBalance: 1000 // sats
    }
  }),
}));

describe('useBalance', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('bitcoin wallet', () => {
    it('should return balance given current account is bitcoin', async () => {
      const { result, waitForNextUpdate } = renderHooksWithContext(() =>
        useBalance(),
      );
      await waitForNextUpdate();
      expect(result.current).toMatchObject({
        balance: 4,
      });
    });

    it('should return balance as 0 when current bitcoin account does not exist', async () => {
      const store = {
        ...defaultStore,
        current: undefined,
      };
      const { result } = renderHooksWithContext(() => useBalance(), store as any);

      await waitFor(() =>
        expect(result.current).toMatchObject({
          balance: 0,
        }),
      );
      expect(queryCoinV2).not.toBeCalled();
    });

    it('should be able to refresh bitcoin account balance', async () => {
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

  describe('lightning wallet', () => {
    const lightningWalletStore = {
      ...defaultStore,
      currentWalletType: WalletType.LightningWallet,
    };
    
    it('should return balance given current account is lightning', async () => {
      const { result, waitForNextUpdate } = renderHooksWithContext(() => useBalance(), lightningWalletStore);
      await waitForNextUpdate();
      expect(result.current).toMatchObject({
        balance: 1000,
      });
    });

    it('should return balance as 0 when current lightning wallet does not exist', async () => {
      const store = {
        ...defaultStore,
        currentWalletType: WalletType.LightningWallet,
        lightning: {
          ...defaultStore.lightning,
          current: undefined
        }
      };
      const { result } = renderHooksWithContext(() => useBalance(), store as any);

      await waitFor(() =>
        expect(result.current).toMatchObject({
          balance: 0,
        }),
      );
      expect(queryLightningBalance).not.toBeCalled();
    });

    it('should be able to refresh lightning wallet balance', async () => {
      const { result, waitForNextUpdate } = renderHooksWithContext(() => useBalance(), lightningWalletStore);
      await waitForNextUpdate();
      expect(queryLightningBalance).toBeCalledTimes(1);

      act(() => {
        result.current.refresh();
      });
      await waitForNextUpdate();
      expect(queryLightningBalance).toBeCalledTimes(2);
    });
  });
});
