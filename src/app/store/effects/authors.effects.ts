import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { CoursesService } from '../../courses/courses.service';
import {
  ActionTypes,
  GetAuthors,
  LoadAuthorsFailed,
} from '../actions/authors.actions';

@Injectable()
export class AuthorsEffects {
  public getAuthorsRequest: any = createEffect(() => {
    return this.actions$.pipe(
      ofType(ActionTypes.getAuthorsRequest),
      switchMap(() => {
        return this.coursesService.getAuthors().pipe(
          map((result) => {
            return new GetAuthors(result);
          }),
          catchError((error) => of(new LoadAuthorsFailed(error)))
        );
      })
    );
  });

  public constructor(
    private coursesService: CoursesService,
    private actions$: Actions
  ) {}
}
