import {createContext, useContext, useEffect} from 'react';

import {loadDecryptKey} from './decrypt_key';
import {decrypt} from './decryptor';
import {DriverRecord} from './record';

export interface Store {
  records: ReadonlyArray<DriverRecord>;
  setRecords: (records: DriverRecord[]) => void;
  error: string;
  setError: (err: string) => void;
}

export const StoreContext = createContext<Store>({
  records: [],
  setRecords: () => {},
  error: '',
  setError: () => {},
});

export function useStore() {
  return useContext(StoreContext);
}

let DATABASE_PROMISE: Promise<Response> | null = null;

export function useRecords() {
  const store = useStore();
  const decryptKey = loadDecryptKey();

  useEffect(() => {
    if (store.records.length || !decryptKey) {
      return;
    }
    const path = 'database/driverRecords';
    if (!DATABASE_PROMISE) {
      DATABASE_PROMISE = fetch(path);
    } else {
      return;
    }
    DATABASE_PROMISE.then(async (result) => {
      if (!result.ok) {
        throw new Error(`Failed to load ${path}`);
      }
      console.log(`Decrypting ${path}`);
      const decrypted = await decrypt(await result.arrayBuffer(), decryptKey);
      const parsed = JSON.parse(await decrypted.text()) as DriverRecord[];
      parsed.sort((r1, r2) => {
        if (r1.created > r2.created) return -1;
        if (r1.created < r2.created) return 1;
        return 0;
      });
      store.setRecords(parsed);
    }).catch((err) => {
      store.setError(err instanceof Error ? err.message : String(err));
    });
  }, [store.records]);
  return store.records;
}

export function useError() {
  return useStore().error;
}
