import { PersistedData, Wallet } from '../interface';

export const getPersistedData = async <T>(wallet: Wallet, key: keyof PersistedData, defaultValue: T): Promise<T> => {
  const persistedData = await wallet.request<PersistedData>({
    method: 'snap_manageState',
    params: ['get'],
  });
  if (persistedData && persistedData[key]) {
    return persistedData[key] as unknown as T;
  }
  return defaultValue;
};

export const updatePersistedData = async (wallet: Wallet, key: keyof PersistedData, value: any) => {
  const persistedData = await wallet.request<PersistedData>({
    method: 'snap_manageState',
    params: ['get'],
  });
  const updatedData = {
    ...persistedData,
    [key]: value,
  }

  await wallet.request({
    method: 'snap_manageState',
    params: ['update', updatedData],
  });
};
