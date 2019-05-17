import h from 'snabbdom/h';
import compose from 'ramda/es/compose';
import path from 'ramda/es/path';

import  { apikey } from '../../state/apiKey';

export default () => h('input', {
  props: {
    value: apikey.get(),
  },
  on: {
    change: compose(apikey.set, path(['target', 'value'])),
  }
});
