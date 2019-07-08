import { init } from 'snabbdom';
import { state } from 'kaleido';
import { scan } from 'flyd';
import curry from 'ramda/es/curry';
import snabbdomClass from 'snabbdom/modules/class';
import snabbdomProps from 'snabbdom/modules/props';
import snabbdomStyle from 'snabbdom/modules/style';
import snabbdomEventListeners from 'snabbdom/modules/eventlisteners';

import app from './root';


export const render = () => {
  const patch = curry(init([ snabbdomClass, snabbdomProps, snabbdomStyle, snabbdomEventListeners ]));
  const mountpoint = document.getElementById('app');
  const vdom = state.map(app);

  scan(patch, mountpoint, vdom);
};
