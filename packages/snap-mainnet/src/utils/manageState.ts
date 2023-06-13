import {PersistedData, Snap} from '../interface';

export const getPersistedData = async <T>(
  snap: Snap,
  key: keyof PersistedData,
  defaultValue: T,
): Promise<T> => {
  const persistedData = await snap.request<PersistedData>({
    method: 'snap_manageState',
    params: {
      operation: 'get'
    },
  });
  if (persistedData && persistedData[key]) {
    return persistedData[key] as unknown as T;
  }
  return defaultValue;
};

export const updatePersistedData = async (
  snap: Snap,
  key: keyof PersistedData,
  value: any,
) => {
  const persistedData = await snap.request<PersistedData>({
    method: 'snap_manageState',
    params: {
      operation: 'get'
    },
  });
  const updatedData = {
    ...persistedData,
    [key]: value,
  };

  await snap.request({
    method: 'snap_manageState',
    params: {
      operation: 'update',
      newState: updatedData
    },
  });
};
