import h from 'snabbdom/h';

import apiKeyInput from './components/apiKeyInput';
import kyoushi from './components/kyoushi';

import { refreshAvailableSubjects } from './state/subject';
import { remainingSubjects } from './state/tasks';


export default () => h('h1', [
  apiKeyInput(),
  h('div.reviews', remainingSubjects().length),
  h('button', {
    on: { click: refreshAvailableSubjects }
  }, 'Refresh'),
  kyoushi(),
]);

