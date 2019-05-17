import scope from 'kaleido';
import { on } from 'flyd';

export const persistedScope = (path, initial, storageID) => {
  const storage = `keitaikani.${storageID}`;
  const fromStorage = JSON.parse(localStorage.getItem(storage));
  const toStorage = v => localStorage.setItem(storage, JSON.stringify(v));

  const s = scope(path, fromStorage || initial);
  on(toStorage, s.$);

  return s;
};
