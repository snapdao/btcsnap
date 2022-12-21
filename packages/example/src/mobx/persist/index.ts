import {
  applyPatch,
  applySnapshot,
  getSnapshot,
  IAnyType,
  IStateTreeNode,
  onSnapshot,
} from 'mobx-state-tree';
import { Migration } from '../migrations/Migration';
import { StoreVersion, StoreVersionKey } from '../migrations/StoreVersion';

type PersistConfig<T extends IAnyType> = {
  store: IStateTreeNode<T>;
  storageKey: string;
  storageAdapter: {
    getItem: (key: string) => Promise<string | null>;
    setItem: <T>(key: string, value: T) => Promise<T>;
    removeItem(key: string, callback?: (error?: Error) => void): Promise<void>;
  };
  options?: {
    codec?: {
      deserialize: (value: string) => Record<string, any>;
      serialize: (value: Record<string, any>) => string;
    };
    manualPersist?: boolean;
    whitelist?: string[];
  };
  version?: number;
  migrations?: Migration<keyof StoreVersion, keyof StoreVersion>[];
};

export interface Persistor {
  purge: () => Promise<void>;
  flush: () => Promise<string>;
  pause: () => void;
  persist: () => void;
}

export const createPersistor = <T extends IAnyType>(config: PersistConfig<T>): { store: IStateTreeNode; persistor: Persistor} => {
  const {
    store,
    storageAdapter,
    storageKey,
    options,
    migrations,
    version = 0,
  } = config;
  const deserialize = options?.codec?.deserialize || JSON.parse;
  const serialize = options?.codec?.serialize || JSON.stringify;

  const runMigration = (
    snapShot: any,
    migration: Migration<StoreVersionKey, StoreVersionKey>,
  ) => {
    if (migration.from === snapShot['_version'] && migration.to <= version) {
      return migration.runScript(snapShot);
    }
    return snapShot;
  };

  const runMigrations = (snapshot: any) => {
    return (
      migrations?.reduce((acc, cur) => {
        return runMigration(acc, cur);
      }, snapshot) || snapshot
    );
  };

  let _synchronized = false;

  storageAdapter
    .getItem(storageKey)
    .then((value) => {
      const initialSnapshot = getSnapshot(store);
      const snapshot = deserialize(value || '{}');
      const migratedSnapshot = runMigrations(snapshot);
      const whitelist = options?.whitelist;
      if (whitelist) {
        const keys = Object.keys(initialSnapshot);
        keys.forEach((key) => {
          if (!whitelist.includes(key)) {
            delete migratedSnapshot[key];
          }
        });
      }
      const finalSnapshot = Object.assign(
        {},
        initialSnapshot,
        migratedSnapshot,
      );
      applySnapshot(store, finalSnapshot);
      applyPatch(store, {
        op: 'replace',
        path: '/_rehydrated',
        value: true,
      });
      _synchronized = true;
    })
    .catch((e) => {
      console.info(e);
      console.error(e);
    });

  let _currentSnapShot: Record<string, any>;

  let _persistence = true;

  if (options && options.manualPersist !== undefined) {
    const { manualPersist } = options;
    _persistence = !manualPersist;
  }

  const purge = () => {
    return storageAdapter.removeItem(storageKey);
  };

  const flush = () => {
    return storageAdapter.setItem(storageKey, serialize(_currentSnapShot));
  };

  const pause = () => {
    _persistence = false;
  };

  const persist = () => {
    _persistence = true;
  };

  onSnapshot<any>(store, (snapshot) => {
    const whitelist = options?.whitelist;
    if (whitelist) {
      _currentSnapShot = {};
      whitelist.forEach((key) => {
        _currentSnapShot[key] = snapshot[key];
      });
    } else {
      _currentSnapShot = snapshot;
    }
    if (_persistence && _synchronized) {
      flush();
    }
  });

  return {
    store,
    persistor: {
      purge,
      flush,
      pause,
      persist,
    },
  };
};
