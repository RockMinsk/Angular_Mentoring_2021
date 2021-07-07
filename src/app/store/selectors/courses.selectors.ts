import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../app.states';
import { CoursesState } from '../reducers/courses.reducer';

const getCourses = createFeatureSelector<AppState, CoursesState>('courses');

export const getAllCourses = createSelector(getCourses, (state) => state.data);

export const getAllCoursesLoaded = createSelector(
  getCourses,
  (state) => state.allCoursesLoaded
);

export const getAllCoursesNumber = createSelector(getCourses, (state) => {
  if (state.numberOfCourses) {
    return state.numberOfCourses;
  } else {
    return 0;
  }
});
