import { ICourse } from '../../courses/courses-page/courses-page-items-list/courses-page-item/courses-page-item.model';
import { ActionTypes, All } from '../actions/courses.actions';

export interface CoursesState {
  allCoursesLoaded: boolean;
  numberOfCourses: number;
  numberOfSearchedCourses: number;
  data: ICourse[] | null;
}

export const initialState: CoursesState = {
  allCoursesLoaded: false,
  numberOfCourses: 0,
  numberOfSearchedCourses: 0,
  data: null,
};

export const coursesReducer = (state = initialState, action: All) => {
  switch (action.type) {
    case ActionTypes.loadCoursesPerPage:
      return {
        allCoursesLoaded: true,
        data: action.payload,
      };
    case ActionTypes.getTotalNumberOfCourses:
      return {
        ...state,
        numberOfCourses: action.payload,
      };
    case ActionTypes.addCourse:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export const myCoursesReducer = (state: any, action: any) =>
  coursesReducer(state, action);
