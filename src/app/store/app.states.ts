import { ActionReducer } from '@ngrx/store';
// import { AllAuthActions } from './actions/auth.actions';
// import { AllCoursesActions } from './actions/courses.actions';
import { authReducer, AuthState } from './reducers/auth.reducer';
import { CoursesState, coursesReducer } from './reducers/courses.reducer';

export interface AppState {
  authState: AuthState;
  courses: CoursesState;
}

// TODO: change "any" to used Actions after investigation of the following issue:
// Type 'ActionReducer<AuthState, AllAuthActions>' is not assignable to type 'ActionReducer<AuthState, Action>
interface Reducer {
  auth: ActionReducer<AuthState, any>;
  courses: ActionReducer<CoursesState, any>;
}

export const reducers: Reducer = {
  auth: authReducer,
  courses: coursesReducer,
};
