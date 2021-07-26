import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../app.states';
import { AuthorsState } from '../reducers/authors.reducer';

const getAuthors = createFeatureSelector<AppState, AuthorsState>('authors');

export const getAllAuthors = createSelector(getAuthors, (state) => {
  return state.data;
});

export const getAllAuthorsLoaded = createSelector(
  getAuthors,
  (state) => state.allAuthorsLoaded
);
