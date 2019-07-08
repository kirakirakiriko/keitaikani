import h from 'snabbdom/h';
import { currentTask } from '../../../state/tasks';

import stage from './stage';
import answerHistory from './answerHistory';

export default () => h('section.kyoushi', [
  stage(currentTask()),
  answerHistory(),
]);
