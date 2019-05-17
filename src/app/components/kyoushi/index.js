import h from 'snabbdom/h';

import { learning, toggleLearning } from '../../state/learning';
import { currentTask } from '../../state/tasks';

import stage from './stage';


export default () => h('section.kyoushi', [
  !learning.get() ? null : stage(currentTask()),
  h('button', {
    on: { click: toggleLearning }
  }, 'Start')
]);
