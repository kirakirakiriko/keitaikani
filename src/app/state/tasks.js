import { combine } from 'flyd';
import chain from 'ramda/es/chain';
import compose from 'ramda/es/compose';
import cond from 'ramda/es/cond';
import head from 'ramda/es/head';
import path from 'ramda/es/path';
import propEq from 'ramda/es/propEq';
import reject from 'ramda/es/reject';
import sortBy from 'ramda/es/sortBy';
import uniqBy from 'ramda/es/uniqBy';

import { alreadyAnsweredCorrectly, answers } from './answer';
import { availableSubjects } from './subject';
import { learning } from './learning';


const isRadical = propEq('object', 'radical');
const isKanji = propEq('object', 'kanji');
const isVocabulary = propEq('object', 'vocabulary');

const radicalTasks = subject => [
  {
    subject,
    type: 'meaning',
  },
];

const vocabularyTasks = subject => [
  {
    subject,
    type: 'meaning',
  },
  {
    subject,
    type: 'reading',
  },
];

const subjectToTasks = cond([
  [isRadical, radicalTasks],
  [isKanji, vocabularyTasks],
  [isVocabulary, vocabularyTasks],
]);

const subjectsToTasks = chain(subjectToTasks);

export const tasks = combine(
  (answers, availableSubjects) => compose(
    sortBy(path(['subject', 'id'])),
    reject(alreadyAnsweredCorrectly(answers())),
    subjectsToTasks,
  )(availableSubjects()),
[answers.$, availableSubjects.$]);

export const currentTask = tasks.map(head);
export const remainingSubjects = tasks.map(uniqBy(path(['subject', 'id'])));
