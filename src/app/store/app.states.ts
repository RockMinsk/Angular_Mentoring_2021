import { ActionReducer } from '@ngrx/store';
// import { AllAuthActions } from './actions/auth.actions';
// import { AllCoursesActions } from './actions/courses.actions';
import { AuthState, authReducer } from './reducers/auth.reducer';
import { CoursesState, coursesReducer } from './reducers/courses.reducer';
import { AuthorsState, authorsReducer } from './reducers/authors.reducer';

export interface AppState {
  authState: AuthState;
  courses: CoursesState;
  authors: AuthorsState;
}

// TODO: change "any" to used Actions after investigation of the following issue:
// Type 'ActionReducer<AuthState, AllAuthActions>' is not assignable to type 'ActionReducer<AuthState, Action>
interface Reducer {
  auth: ActionReducer<AuthState, any>;
  courses: ActionReducer<CoursesState, any>;
  authors: ActionReducer<AuthorsState, any>;
}

export const reducers: Reducer = {
  auth: authReducer,
  courses: coursesReducer,
  authors: authorsReducer,
};
