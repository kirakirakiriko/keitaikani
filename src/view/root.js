import h from 'snabbdom/h';
import { doPullSync } from '../sync';

import apiKeyInput from './components/apiKeyInput';
import kyoushi from './components/kyoushi';
import header from './components/header';
import index from './components/indexPage';

import { page } from '../state/ui';

const routes = {
  '/': index,
  '/review': kyoushi,
  '/settings': apiKeyInput,
};

const currentPage = () => routes[page.get()] || (() => null);

const layout = () => [
  header(),
  currentPage()(),
];

export default () => h('h1', {
  hook: {
    init: doPullSync,
  },
}, layout());
