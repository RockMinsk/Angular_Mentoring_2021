import { AuthState, myAuthReducer } from './reducers/auth.reducer';
import { AuthorsState, myAuthorsReducer } from './reducers/authors.reducer';
import { CoursesState, myCoursesReducer } from './reducers/courses.reducer';

export interface AppState {
  authState: AuthState;
  courses: CoursesState;
  authors: AuthorsState;
}

export const reducers = {
  auth: myAuthReducer,
  courses: myCoursesReducer,
  authors: myAuthorsReducer,
};
