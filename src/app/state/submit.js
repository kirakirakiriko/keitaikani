import flip from 'ramda/es/flip';
import map from 'ramda/es/map';
import compose from 'ramda/es/compose';
import cond from 'ramda/es/cond';
import includes from 'ramda/es/includes';
import filter from 'ramda/es/filter';
import prop from 'ramda/es/prop';
import propEq from 'ramda/es/propEq';
import path from 'ramda/es/path';
import toLower from 'ramda/es/toLower';
import { userInput } from './input';

import { correct, wrong } from './answer';

const validateReading = compose(
  flip(includes),
  map(prop('reading')),
  filter(prop('accepted_answer')),
  path(['subject', 'data', 'readings']),
);

const validateMeaning = compose(
  flip(includes),
  map(toLower),
  map(prop('meaning')),
  filter(prop('accepted_answer')),
  path(['subject', 'data', 'meanings']),
);

const validateAnswer = cond([
  [propEq('type', 'reading'), validateReading],
  [propEq('type', 'meaning'), validateMeaning]
]);

export const submitAnswer = task => answer => {
 (validateAnswer(task)(answer) ? correct : wrong)(task);
 userInput.set('');
} ;

