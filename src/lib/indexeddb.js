import Dexie from 'dexie';
import 'dexie-observable';
import scope from 'kaleido';
import { on, stream } from 'flyd';
import aftersilence from 'flyd/module/aftersilence';
import propEq from 'ramda/es/propEq';

export const dbInstance = () => {
  const dexie = new Dexie('KeitaiKani');

  dexie.version(1).stores({
    availableSubjects: '&id',
    apiKey: 'id',
    reviewResults: '&subject_id',
  });
  dexie.version(2).stores({});

  return dexie;
};

export const dbTable = (tableName) => {
  const db = dbInstance();
  const table = db[tableName];

  if (!table) {
    throw new Error(`Unknown IndexedDB Table ${tableName}!`);
  }

  return [table, db];
};

export const put = (tableName, xs) => {
  const [table] = dbTable(tableName);
  return table.bulkPut(xs);
};

export const write = (tableName, xs) => {
  const [table] = dbTable(tableName);
  return table.clear().then(() => table.bulkPut(xs));
};

export const read = (tableName) => {
  const [table] = dbTable(tableName);
  return table.toArray();
};

export const remove = (tableName, key) => {
  const [table] = dbTable(tableName);
  return table.delete(key);
};

export const readingIndexedDbScope = (path, tableName) => {
  const s = scope(path, []);
  const [table, instance] = dbTable(tableName);
  table.toArray().then(s.set);

  const dbUpdates = stream();

  instance.on('changes', events => {
    events.filter(propEq('table', tableName)).map(dbUpdates);
  });

  const reSync = aftersilence(100, dbUpdates);
  on(() => {
    table.toArray().then(s.set);
  }, reSync);

  return s;
};

export const writingIndexedDbScope = (path, tableName) => {
  const s = scope(path, [])
  const [table, instance] = dbTable(tableName);

  table.toArray().then(s.set);

  on((xs) => table.clear().then(table.bulkPut(xs)) , s.$);

  return s;
};
