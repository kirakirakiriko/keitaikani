import trim from 'ramda/es/trim';
import h from 'snabbdom/h';
import compose from 'ramda/es/compose';
import path from 'ramda/es/path';

import { apiKey, setApiKey } from '../../../state/apiKey';

export default () => h('input', {
  props: {
    value: apiKey(),
  },
  on: {
    change: compose(setApiKey, trim, path(['target', 'value'])),
  }
});
