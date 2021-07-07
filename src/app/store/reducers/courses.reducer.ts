import { ICourse } from '../../courses/courses-page/courses-page-items-list/courses-page-item/courses-page-item.model';
import { ActionTypes, AllCoursesActions } from '../actions/courses.actions';

export interface CoursesState {
  allCoursesLoaded: boolean;
  numberOfCourses: number;
  numberOfSearchedCourses: number;
  data: ICourse[] | ICourse | null;
}

export const initialState: CoursesState = {
  allCoursesLoaded: false,
  numberOfCourses: 0,
  numberOfSearchedCourses: 0,
  data: null,
};

export const coursesReducer = (
  state: CoursesState = initialState,
  action: AllCoursesActions
) => {
  switch (action.type) {
    case ActionTypes.loadCoursesPerPage:
      return {
        ...state,
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
