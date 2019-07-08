import path from 'ramda/es/path';
import { readingIndexedDbScope, write } from '../lib/indexeddb';

const storedApiKey = readingIndexedDbScope(['apiKey'], 'apiKey', 'id');

export const apiKey = storedApiKey.$.map(path([0, 'apiKey']));
export const setApiKey = key => write('apiKey', [{ id: 'apikey', apiKey: key }]);
