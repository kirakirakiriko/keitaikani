import prop from 'ramda/es/prop';
import { fetchAPI } from './fetch';

export const subjectsForAssignments = (apiKey) => (ids) => fetchAPI(`subjects?ids=${ids.join(',')}`, {})(apiKey)
  .then(prop('data'));
