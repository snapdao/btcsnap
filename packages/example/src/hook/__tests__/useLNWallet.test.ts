import {
  renderHooksWithContext,
  defaultStore,
} from '../../__tests__/utils/renderHookWithContext';
import * as snap from '../../lib/snap';
import { waitFor } from '@testing-library/react';
import { useLNWallet } from '../useLNWallet';

const createResult = {
  user_id: '363abbadfsadfssdfafsdasdfasdfsdfsdf7sdfasadfsdfs',
  user_password: '30a3dfddfssdffsddfs77fffdsasfdfs',
  credential: {
    login: '2fa6f305aadfsafsdasdfadfsadfs',
    password: 'asdffsa3aadfsafdsafsdafsdsaf',
  },
};

jest.mock('../../api/lightning/createWallet', () => ({
  createWallet: jest.fn().mockResolvedValue(createResult),
}));

jest.mock('../../services/LightningService/createLightningWallet', () => ({
  createLightningWallet: jest.fn().mockResolvedValue(true),
}));

jest.mock('../../tracking/events', () => ({
  trackLightningAddSuccess: jest.fn().mockReturnValue(void 0),
}));

describe('useLNWallet', () => {
  it('should return createLightningWallet given name and pubkey', async () => {
    jest.spyOn(snap, 'getLNWalletData').mockResolvedValue('pubkey');
    jest.spyOn(snap, 'saveLNDataToSnap').mockResolvedValue(undefined);
    const store = {
      ...defaultStore,
    };
    const { result } = renderHooksWithContext(() => useLNWallet(), store);

    await waitFor(async () => {
      const res = await result.current.create('name');
      expect(res).toBe(true);
    });
    expect(result.current.wallet).toBe(createResult);
  });

  it('should return createLightningWallet when name does not exist', async () => {
    jest.spyOn(snap, 'saveLNDataToSnap').mockResolvedValue('pubkey');
    const store = {
      ...defaultStore,
    };
    const { result } = renderHooksWithContext(() => useLNWallet(), store);

    await waitFor(async () => {
      const res = await result.current.create(undefined as unknown as string);
      expect(res).toBe(true);
    });
    expect(result.current.wallet).toBe(createResult);
  });
});
