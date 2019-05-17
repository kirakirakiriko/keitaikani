import { fetchAPI } from './fetch';
import { path } from 'ramda';

export const fetchAvailableReviews = apiKey => fetchAPI('/summary')(apiKey)
  .then(path(['data', 'reviews', 0, 'subject_ids']));
