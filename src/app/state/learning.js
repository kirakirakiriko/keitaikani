import scope from 'kaleido';
import filter from 'flyd/module/filter';


export const learning = scope(['kyoushi', 'learning'], false);
export const toggleLearning = () => learning.set(!learning.get());
export const startingLearning = filter(Boolean, learning.$);

