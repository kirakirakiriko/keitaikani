import propEq from 'ramda/es/propEq';
import tap from 'ramda/es/tap';
import { remove, readingIndexedDbScope } from '../lib/indexeddb';
import { subjectsForAssignments } from '../api/subject';
import { fetchAvailableReviews, putReviewResult } from '../api/assignment';
import { apiKey } from './apiKey';


export const availableSubjects = readingIndexedDbScope(['reviews', 'available'], 'availableSubjects');
export const reviewResults = readingIndexedDbScope(['reviews', 'syncing'], 'reviewResults');

export const fetchAvailableSubjects = () => fetchAvailableReviews(apiKey())
  .then(subjectsForAssignments(apiKey()));

export const subjectIsRadical = propEq('object', 'radical');
export const subjectIsKanji = propEq('object', 'kanji');
export const subjectIsVocabulary = propEq('object', 'vocabulary');


export const isSubjectSyncing = subject => reviewResults.get().find(propEq('subject_id', subject.id));

export const updateReview = review => putReviewResult(apiKey())(review)
  .then(() => remove('reviewResults', review.subject_id));
