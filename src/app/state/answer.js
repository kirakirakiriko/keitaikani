import append from 'ramda/es/append';
import compose from 'ramda/es/compose';
import prop from 'ramda/es/prop';
import propEq from 'ramda/es/propEq';
import filter from 'ramda/es/filter';
import isEmpty from 'ramda/es/isEmpty';
import complement from 'ramda/es/complement';
import { persistedScope } from '../../lib/localStorage';

export const answers = persistedScope(['kyoushi', 'answers'], [], 'answers');

export const alreadyAnsweredCorrectly = answers => task => compose(
  complement(isEmpty),
  filter(prop('correct')),
  filter(propEq('subjectId', task.subject.id)),
)(answers);

export const wrongAnswer = task => ({
  subjectId: task.subject.id,
  correct: false,
});

export const correctAnswer = task => ({
  subjectId: task.subject.id,
  correct: true,
});

export const wrong = compose(answer => answers.do(append(answer)), wrongAnswer);
export const correct = compose(answer => answers.do(append(answer)), correctAnswer);
