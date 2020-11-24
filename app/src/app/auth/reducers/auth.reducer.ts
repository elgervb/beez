import { createReducer, on } from '@ngrx/store';

import * as AuthActions from '../actions/auth.actions';

export const authFeatureKey = 'auth';

export interface State {
  token?: string;
  error?: string;
}

export const initialState: State = {
  token: localStorage.getItem('token') || null
};

export const reducer = createReducer(
  initialState,
  on(AuthActions.login, state => ({ ...state, error: undefined })),
  on(AuthActions.loginSuccess, (state, action) => ({ ...state, token: action.data.access_token })),
  on(AuthActions.loginFailure, (state, action) => ({ ...state, error: action.error })),
  on(AuthActions.logout, state => ({ ...state, token: undefined }))
);
