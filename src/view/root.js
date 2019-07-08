import h from 'snabbdom/h';
import { doPullSync } from '../sync';

import apiKeyInput from './components/apiKeyInput';
import kyoushi from './components/kyoushi';

import { remainingSubjects } from '../state/tasks';
import { page } from '../state/ui';

const settings = () => apiKeyInput();

const routes = {
  '/review': kyoushi,
  '/settings': settings
};

const currentPage = () => routes[page.get()] || (() => null);

const layout = () => [
  h('div.reviews', remainingSubjects().length),
  h('button', {
    on: { click: doPullSync }
  }, 'Refresh'),
  currentPage()(),
];

export default () => h('h1', {
  hook: {
    init: doPullSync,
  }
}, layout());