import { fetchAPI } from './fetch';
import path from 'ramda/es/path';
import tap from 'ramda/es/tap';

export const fetchAvailableReviews = apiKey => fetchAPI('summary')(apiKey)
  .then(path(['data', 'reviews', 0, 'subject_ids']));

export const putReviewResult = apiKey => result => fetchAPI('reviews', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    review: result
  }),
})(apiKey);
