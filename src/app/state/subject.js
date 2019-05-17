import { persistedScope } from '../../lib/localStorage';
import { subjectsForAssignments } from '../api/subject';
import { fetchAvailableReviews } from '../api/assignment';
import { apikey } from './apiKey';


export const availableSubjects = persistedScope(['reviews', 'available'], [], 'availableSubjects');

export const refreshAvailableSubjects = () => fetchAvailableReviews(apikey.get())
  .then(subjectsForAssignments(apikey.get()))
  .then(availableSubjects.set);

