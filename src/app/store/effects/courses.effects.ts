import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';

import { CoursesService } from '../../courses/courses.service';
import {
  ActionTypes,
  LoadCoursesPerPage,
  AddCourse,
  EditCourse,
  RemoveCourse,
  LoadCoursesFailed,
  GetTotalNumberOfCourses,
} from '../actions/courses.actions';

@Injectable()
export class CoursesEffects {
  public loadCoursesPerPageRequest: any = createEffect(() => {
    return this.actions$.pipe(
      ofType(ActionTypes.loadCoursesPerPageRequest),
      switchMap((data: any) => {
        return this.coursesService.getSortedList(data.payload).pipe(
          map((result) => new LoadCoursesPerPage(result)),
          catchError((error) => of(new LoadCoursesFailed(error)))
        );
      })
    );
  });

  public getTotalNumberOfCoursesRequest: any = createEffect(() => {
    return this.actions$.pipe(
      ofType(ActionTypes.getTotalNumberOfCoursesRequest),
      switchMap((data: any) => {
        return this.coursesService.getTotalNumberOfItems(data.payload).pipe(
          map((result) => {
            return new GetTotalNumberOfCourses(result);
          }),
          catchError((error) => of(new LoadCoursesFailed(error)))
        );
      })
    );
  });

  public loadSearchedCourses: any = createEffect(() => {
    return this.actions$.pipe(
      ofType(ActionTypes.loadSearchedCourses),
      switchMap((data: any) => {
        return this.coursesService.getSearchedList(data.payload).pipe(
          map((result) => {
            return new LoadCoursesPerPage(result);
          }),
          catchError((error) => of(new LoadCoursesFailed(error)))
        );
      })
    );
  });

  public addCourse: any = createEffect(() => {
    return this.actions$.pipe(
      ofType(ActionTypes.addCourseRequest),
      switchMap((data: any) => {
        return this.coursesService.createItem(data.payload).pipe(
          mergeMap(async (course: any) => new AddCourse(course)),
          catchError((error) => of(new LoadCoursesFailed(error)))
        );
      })
    );
  });

  public editCourse: any = createEffect(() => {
    return this.actions$.pipe(
      ofType(ActionTypes.editCourseRequest),
      switchMap((data: any) => {
        return this.coursesService.updateItem(data.payload).pipe(
          mergeMap(async (course: any) => new EditCourse(course)),
          catchError((error) => of(new LoadCoursesFailed(error)))
        );
      })
    );
  });

  public removeCourse: any = createEffect(() => {
    return this.actions$.pipe(
      ofType(ActionTypes.removeCourseRequest),
      switchMap((data: any) => {
        return this.coursesService.removeItem(data.payload).pipe(
          mergeMap(async (id: any) => new RemoveCourse(id)),
          catchError((error) => of(new LoadCoursesFailed(error)))
        );
      })
    );
  });

  public constructor(
    private coursesService: CoursesService,
    private actions$: Actions
  ) {}
}
