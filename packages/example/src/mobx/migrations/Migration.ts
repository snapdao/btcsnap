import { StoreVersion } from './StoreVersion';

export class Migration<
  T extends keyof StoreVersion,
  K extends keyof StoreVersion
> {
  from: T;
  to: K;
  migrateScript: (store: StoreVersion[T]) => StoreVersion[K];

  constructor(props: {
    from: T;
    to: K;
    name?: string;
    migrateScript: (store: StoreVersion[T]) => StoreVersion[K];
  }) {
    this.to = props.to;
    this.from = props.from;
    this.migrateScript = props.migrateScript;
  }

  runScript = (store: StoreVersion[T]) => {
    try {
      const result = this.migrateScript(store);
      result._version = this.to;
      return result;
    } catch (e) {
      console.error('Migration error: ', e);
      return store;
    }
  };
}
