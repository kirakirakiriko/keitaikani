import { combine } from 'flyd';
import chain from 'ramda/es/chain';
import compose from 'ramda/es/compose';
import cond from 'ramda/es/cond';
import head from 'ramda/es/head';
import path from 'ramda/es/path';
import reject from 'ramda/es/reject';
import uniqBy from 'ramda/es/uniqBy';

import { alreadyAnsweredCorrectly, answers } from './answer';
import {
  availableSubjects, isSubjectSyncing, subjectIsKanji, subjectIsRadical, subjectIsVocabulary,
} from './subject';


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
  [subjectIsRadical, radicalTasks],
  [subjectIsKanji, vocabularyTasks],
  [subjectIsVocabulary, vocabularyTasks],
]);

const subjectsToTasks = chain(subjectToTasks);

// const timesAnswered = answrs => task => answrs.filter(pathEq(['subject', 'id'], task.subject.id)).length;

export const tasks = combine(
  (answrs, availSubjects) => compose(
    // sortWith([
    // ascend(timesAnswered(answers()))
    // ]),
    reject(alreadyAnsweredCorrectly(answrs())),
    subjectsToTasks,
    reject(isSubjectSyncing),
  )(availSubjects()),
  [answers.$, availableSubjects.$],
);

export const currentTask = tasks.map(head);
export const remainingSubjects = tasks.map(uniqBy(path(['subject', 'id'])));
