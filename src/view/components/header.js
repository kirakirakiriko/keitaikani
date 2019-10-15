import h from 'snabbdom/h';
import { remainingSubjects } from '../../state/tasks';
import { doPullSync } from '../../sync';

const header = () => h('section.header', [
  h('div.reviews', remainingSubjects().length),
  h('button', {
    on: { click: doPullSync },
  }, 'Refresh'),
]);

export default header;
