import compose from 'ramda/es/compose';
import cond from 'ramda/es/cond';
import identity from 'ramda/es/identity';
import ifElse from 'ramda/es/ifElse';
import path from 'ramda/es/path';
import T from 'ramda/es/T';
import propEq from 'ramda/es/propEq';
import h from 'snabbdom/h';
import { toKana } from 'wanakana';
import { submitAnswer } from '../../../state/submit';
import { userInput } from '../../../state/input';

const isSubmit = e => e.key === 'Enter';

const processInput = cond([
  [propEq('type', 'reading'), () => toKana],
  [T, () => identity],
]);

const submit = task => compose(submitAnswer(task), processInput(task), path(['target', 'value']));
const setInput = task => compose(userInput.set, processInput(task), path(['target', 'value']));

const handleInput = task => ifElse(isSubmit, submit(task), setInput(task));

export default task => (!task ? null : h('div.stage', [
  task.subject.data.characters,
  task.type,
  h('input', { props: { value: userInput.get() }, on: { keyup: handleInput(task)}}),
]));
