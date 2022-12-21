import { useMFPCheck } from '../useMFPCheck';
import { renderHooksWithContext, defaultStore } from '../../__tests__/utils/renderHookWithContext';
import * as snap from '../../lib/snap';
import { waitFor } from '@testing-library/react';

describe('useMFPCheck', () => {
  it('should return isSameMFP as true given same MFP from snap', () => {
    jest.spyOn(snap, 'getMasterFingerprint').mockResolvedValue(defaultStore.current.mfp);
    const { result } = renderHooksWithContext(() => useMFPCheck());

    waitFor(() =>
      expect(result.current).toMatchObject({
        isChecking: false,
        isSameMFP: true
      })
    );
  });


  it('should return isSameMFP as false given a different mfp from snap', () => {
    jest.spyOn(snap, 'getMasterFingerprint').mockResolvedValue(defaultStore.current.mfp);
    const { result } = renderHooksWithContext(() => useMFPCheck(), { current: undefined } as any);

    waitFor(() =>
      expect(result.current).toMatchObject({
        isChecking: false,
        isSameMFP: false
      })
    );
  });

  it('should return isSameMFP as false when current account is not exist', () => {
    const { result } = renderHooksWithContext(() => useMFPCheck(), { current: undefined } as any);
    expect(result.current).toMatchObject({
      isChecking: true,
      isSameMFP: false
    });
  });
});
