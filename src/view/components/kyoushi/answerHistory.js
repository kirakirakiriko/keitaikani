import h from 'snabbdom/h';
import takeLast from 'ramda/es/takeLast';
import prop from 'ramda/es/prop';

import { answers } from '../../../state/answer';
import { allAcceptedMeanings } from '../../../state/submit';

const historyEntry = answer => h(`div.answer.${answer.correct ? 'correct' : 'wrong'}`, [
  answer.subject.data.characters,
  ' - ',
  answer.correct ? 'correct' : 'wrong',
  !answer.correct
    ? h(
      'div.details',
      allAcceptedMeanings(answer)
        .map(prop('meaning'))
        .map(meaning => h('span', meaning)),
    )
    : null,
]);

export default () => h(
  'div.lastAnswers',
  takeLast(3, answers.get())
    .reverse()
    .map(historyEntry),
);
