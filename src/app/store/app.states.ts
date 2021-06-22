import { AuthState, myAuthReducer } from './reducers/auth.reducer';
import { CoursesState, myCoursesReducer } from './reducers/courses.reducer';

export interface AppState {
  authState: AuthState;
  courses: CoursesState;
}

export const reducers = {
  auth: myAuthReducer,
  courses: myCoursesReducer,
};
