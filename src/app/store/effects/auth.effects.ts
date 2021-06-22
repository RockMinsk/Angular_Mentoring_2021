import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { AuthService } from 'src/app/auth/auth.service';
import { CONSTANT } from 'src/app/shared/constants';
import {
  AuthActionTypes,
  LogInSuccess,
  LogInFailed,
  LogIn,
} from '../actions/auth.actions';

@Injectable()
export class AuthEffects {
  public logIn: any = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.login),
      map((action: LogIn) => action.payload),
      switchMap((data: any) => {
        return this.authService.login(data).pipe(
          map(
            (user) =>
              new LogInSuccess({
                token: user.token,
                email: data.login,
              }),
            catchError((error) => of(new LogInFailed(error)))
          )
        );
      })
    )
  );

  public logInSuccess: Observable<any> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActionTypes.loginSuccess),
        tap((user: any) => {
          sessionStorage.setItem(CONSTANT.STORAGE.TOKEN, user.payload.token);
          this.router.navigate([CONSTANT.url.courses]);
          console.log(`User logged in successfully`);
        })
      ),
    { dispatch: false }
  );

  public logOut: Observable<any> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActionTypes.logout),
        tap((user: any) => {
          sessionStorage.removeItem(CONSTANT.STORAGE.TOKEN);
          this.router.navigate([CONSTANT.url.login]);
          console.log(`User logged out successfully`);
        })
      ),
    { dispatch: false }
  );

  public constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
