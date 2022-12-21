import { renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';
import useCountDown from '../useCountdown';

describe('useCountDown', () => {
  const expiredTime = 15555;
  it('should return createLightningWallet given name and pubkey', async () => {
    const { result: { current: [{ seconds }, { start, pause }] } } = renderHook(() => 
      useCountDown({ startTimeMilliseconds: expiredTime })
    );
    
    await waitFor(async () => {
      start();
      expect(seconds).toBe(15);
      pause();
    });
  });
});
