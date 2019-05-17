import { init } from 'snabbdom';
import { state } from 'kaleido';
import { scan } from 'flyd';
import curry from 'ramda/es/curry';
import snabbdomClass from 'snabbdom/modules/class';
import snabbdomProps from 'snabbdom/modules/props';
import snabbdomStyle from 'snabbdom/modules/style';
import snabbdomEventListeners from 'snabbdom/modules/eventlisteners';
import app from './app';

const patch = curry(init([ snabbdomClass, snabbdomProps, snabbdomStyle, snabbdomEventListeners ]));

scan(patch, document.getElementById('app'), state.map(app));
