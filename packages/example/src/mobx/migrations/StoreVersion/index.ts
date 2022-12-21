import { StoreVersion_0 } from './0';

export type StoreVersion = {
  0: StoreVersion_0;
};

export type StoreVersionKey = keyof StoreVersion;
