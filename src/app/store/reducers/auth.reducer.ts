import { IUser } from 'src/app/auth/user.model';
import { AllAuthActions, AuthActionTypes } from '../actions/auth.actions';

export interface AuthState {
  isAuthenticated: boolean;
  user: IUser | null;
  errorMessage: string | null;
}

export const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  errorMessage: null,
};

export const authReducer = (
  state: AuthState = initialState,
  action: AllAuthActions
) => {
  switch (action.type) {
    case AuthActionTypes.loginSuccess:
      return {
        ...state,
        isAuthenticated: true,
        user: {
          token: action.payload.token,
          email: action.payload.login,
        },
        errorMessage: null,
      };
    case AuthActionTypes.getUserInfo:
      return {
        ...state,
        user: action.payload,
      };
    case AuthActionTypes.loginFailed:
      return {
        ...state,
        errorMessage: 'Incorrect email and/or password.',
      };
    case AuthActionTypes.logout:
      return initialState;
    default:
      return state;
  }
};
