import { Action } from '@ngrx/store';
import { ICourse } from '../../courses/courses-page/courses-page-items-list/courses-page-item/courses-page-item.model';

export enum ActionTypes {
  loadCoursesPerPageRequest = '[CoursesModule] Load Courses per page request',
  loadCoursesPerPage = '[CoursesModule] Load Courses per page',
  getTotalNumberOfCoursesRequest = '[CoursesModule] Get total number of Courses request',
  getTotalNumberOfCourses = '[CoursesModule] Get total number of Courses',
  addCourseRequest = '[CoursesModule] Add Course request',
  addCourse = '[CoursesModule] Add Course',
  editCourseRequest = '[CoursesModule] Edit Course request',
  editCourse = '[CoursesModule] Edit Course',
  removeCourseRequest = '[CoursesModule] Remove Course request',
  removeCourse = '[CoursesModule] Remove Course',
  loadSearchedCourses = '[CoursesModule] Load Searched Courses',
  loadCoursesFailed = '[CoursesModule] Load Courses Failed',
}

export class AddCourseRequest implements Action {
  public readonly type = ActionTypes.addCourseRequest;
  public constructor(public payload: ICourse) {}
}

export class AddCourse implements Action {
  public readonly type = ActionTypes.addCourse;
  public constructor(public payload: ICourse) {}
}

export class EditCourseRequest implements Action {
  public readonly type = ActionTypes.editCourseRequest;
  public constructor(public payload: ICourse) {}
}

export class EditCourse implements Action {
  public readonly type = ActionTypes.editCourse;
  public constructor(public payload: ICourse) {}
}

export class RemoveCourseRequest implements Action {
  public readonly type = ActionTypes.removeCourseRequest;
  public constructor(public payload: number) {}
}

export class RemoveCourse implements Action {
  public readonly type = ActionTypes.removeCourse;
  public constructor(public payload: number) {}
}

export class LoadCoursesPerPageRequest implements Action {
  public readonly type = ActionTypes.loadCoursesPerPageRequest;
  public constructor(public payload: number) {}
}

export class LoadCoursesPerPage implements Action {
  public readonly type = ActionTypes.loadCoursesPerPage;
  public constructor(public payload: ICourse[]) {}
}

export class GetTotalNumberOfCoursesRequest implements Action {
  public readonly type = ActionTypes.getTotalNumberOfCoursesRequest;
  public constructor(public payload: string) {}
}

export class GetTotalNumberOfCourses implements Action {
  public readonly type = ActionTypes.getTotalNumberOfCourses;
  public constructor(public payload: number) {}
}

export class LoadSearchedCourses implements Action {
  public readonly type = ActionTypes.loadSearchedCourses;
  public constructor(public payload: string) {}
}

export class LoadCoursesFailed implements Action {
  public readonly type = ActionTypes.loadCoursesFailed;
  public constructor(public error: string) {}
}

export type All = LoadCoursesPerPage | GetTotalNumberOfCourses | AddCourse;
