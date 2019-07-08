import map from 'ramda/es/map'

import { updateReview, fetchAvailableSubjects } from './state/subject';
import { read, write } from './lib/indexeddb';

self.addEventListener('sync', event => {
  const handler = eventHandler[event.tag];
  if (!handler) return;
  handler();
});

const pullAvailableSubjects = () => fetchAvailableSubjects()
  .then(subjects => write('availableSubjects', subjects));

const pushAnswers = () => read('reviewResults').then(map(updateReview));

const eventHandler = { pullAvailableSubjects, pushAnswers };
