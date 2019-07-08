import allPass from 'ramda/es/allPass';
import always from 'ramda/es/always';
import and from 'ramda/es/and';
import append from 'ramda/es/append';
import cond from 'ramda/es/cond';
import map from 'ramda/es/map';
import assoc from 'ramda/es/assoc';
import compose from 'ramda/es/compose';
import pathEq from 'ramda/es/pathEq';
import prop from 'ramda/es/prop';
import filter from 'ramda/es/filter';
import isEmpty from 'ramda/es/isEmpty';
import complement from 'ramda/es/complement';
import propEq from 'ramda/es/propEq';
import { on } from 'flyd';
import uniqBy from 'ramda/es/uniqBy';
import T from 'ramda/es/T';
import scope from 'kaleido';
import { put } from '../lib/indexeddb';
import { doPushSync } from '../sync';
import { subjectIsRadical, subjectIsKanji, subjectIsVocabulary } from './subject';

export const answers = scope(['kyoushi', 'answers'], []);

export const alreadyAnsweredCorrectly = answrs => task => compose(
  complement(isEmpty),
  filter(prop('correct')),
  filter(pathEq(['subject', 'id'], task.subject.id)),
)(answrs);

export const wrongAnswer = assoc('correct', false);
export const correctAnswer = assoc('correct', true);

export const wrong = compose(answer => answers.do(append(answer)), wrongAnswer);
export const correct = compose(answer => answers.do(append(answer)), correctAnswer);

const vocabularyCompleted = answrs => (subject) => {
  const correctSubjectAnswers = answrs.filter(allPass([
    pathEq(['subject', 'id'], subject.id),
    prop('correct'),
  ]));

  return and(
    !!correctSubjectAnswers.find(propEq('type', 'meaning')),
    !!correctSubjectAnswers.find(propEq('type', 'reading')),
  );
};

const radicalCompleted = answrs => subject => !!answrs.find(allPass([
  pathEq(['subject', 'id'], subject.id),
  propEq('type', 'meaning'),
  prop('correct'),
]));

export const isSubjectCompleted = answrs => cond([
  [subjectIsRadical, radicalCompleted(answrs)],
  [subjectIsKanji, vocabularyCompleted(answrs)],
  [subjectIsVocabulary, vocabularyCompleted(answrs)],
  [T, always(false)],
]);

const radicalMeaningWrongCount = answrs => subject => answrs
  .filter(a => !a.correct)
  .filter(a => a.subject.id === subject.id)
  .length;

const vocabularyWrongCount = type => answrs => subject => answrs
  .filter(a => !a.correct)
  .filter(a => a.type === type)
  .filter(a => a.subject.id === subject.id)
  .length;

export const meaningWrongCount = answrs => cond([
  [subjectIsRadical, radicalMeaningWrongCount(answrs)],
  [subjectIsKanji, vocabularyWrongCount('meaning')(answrs)],
  [subjectIsVocabulary, vocabularyWrongCount('meaning')(answrs)],
  [T, always(0)],
]);

export const readingWrongCount = answrs => cond([
  [subjectIsRadical, always(0)],
  [subjectIsKanji, vocabularyWrongCount('reading')(answrs)],
  [subjectIsVocabulary, vocabularyWrongCount('reading')(answrs)],
  [T, always(0)],
]);


const reviewResult = answers.$.map((answrs) => {
  const completedSubjects = compose(
    filter(isSubjectCompleted(answrs)),
    uniqBy(prop('id')),
    map(prop('subject')),
  )(answrs);

  return completedSubjects.map(s => ({
    subject_id: s.id,
    incorrect_meaning_answers: meaningWrongCount(answrs)(s),
    incorrect_reading_answers: readingWrongCount(answrs)(s),
  }));
});

on((xs) => {
  put('reviewResults', xs).then(doPushSync);
}, reviewResult);
