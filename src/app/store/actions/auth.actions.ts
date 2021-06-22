import { Action } from '@ngrx/store';
import { IUser } from 'src/app/auth/user.model';

export enum AuthActionTypes {
  login = '[Auth] Login',
  loginSuccess = '[Auth] Login Success',
  getUserInfo = '[Auth] Det user info',
  loginFailed = '[Auth] Login Failed',
  logout = '[Auth] Logout',
}

export class LogIn implements Action {
  public readonly type = AuthActionTypes.login;
  public constructor(public payload: Partial<IUser>) {}
}

export class LogInSuccess implements Action {
  public readonly type = AuthActionTypes.loginSuccess;
  public constructor(public payload: any) {}
}

export class GetUserInfo implements Action {
  public readonly type = AuthActionTypes.getUserInfo;
  public constructor(public payload: any) {}
}

export class LogInFailed implements Action {
  public readonly type = AuthActionTypes.loginFailed;
  public constructor(public error: string) {}
}

export class LogOut implements Action {
  public readonly type = AuthActionTypes.logout;
}

export type All = LogIn | LogInSuccess | GetUserInfo | LogInFailed | LogOut;
