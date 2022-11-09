import { act } from '@testing-library/react-hooks';
import { useMFPCheck } from '../useMFPCheck';
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

describe('useLNWallet', () => {
  it('should return createLightningWallet given name and pubkey', async () => {
    jest.spyOn(snap, 'getLNWalletData').mockResolvedValue('pubkey');
    jest.spyOn(snap, 'saveLNDataToSnap').mockResolvedValue(undefined);
    const store = {
      ...defaultStore,
      lightning: { nextWalletName: 'Lightning 2' },
    };
    const { result } = renderHooksWithContext(() => useLNWallet(), store);

    await waitFor(async () => {
      const res = await result.current.create('name');
      expect(res).toBe(true);
    });
    expect(result.current.wallet).toBe(createResult);
  });

  it('should return createLightningWallet when pubkey or name does not exist', async () => {
    jest.spyOn(snap, 'getLNWalletData').mockResolvedValue(undefined);
    jest.spyOn(snap, 'saveLNDataToSnap').mockResolvedValue(undefined);
    const store = {
      ...defaultStore,
      lightning: { nextWalletName: 'Lightning 2' },
    };
    const { result } = renderHooksWithContext(() => useLNWallet(), store);

    await waitFor(async () => {
      const res = await result.current.create('name');
      expect(res).toBe(undefined);
    });

    jest.spyOn(snap, 'saveLNDataToSnap').mockResolvedValue('pubkey');
    await waitFor(async () => {
      // @ts-ignore
      const res = await result.current.create(undefined);
      expect(res).toBe(undefined);
    });
    expect(result.current.wallet).toBe(undefined);
  });
});
