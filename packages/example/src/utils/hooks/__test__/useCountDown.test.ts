import { waitFor } from '@testing-library/react';
import {
  renderHooksWithContext,
  defaultStore,
} from '../../../__tests__/utils/renderHookWithContext';
import useCountDown from '../useCountdown';
describe('useCountDown', () => {
  const seconds = 15555;
  it('should return createLightningWallet given name and pubkey', async () => {

    const store = {
      ...defaultStore,
    };

    const { result } = renderHooksWithContext(() => useCountDown({startTimeMilliseconds: seconds}), store);
    
    await waitFor(async () => {
      result.current[1].start();
      expect(result.current[0].seconds).toBe(15);
      result.current[1].pause();
    });
  });
});
