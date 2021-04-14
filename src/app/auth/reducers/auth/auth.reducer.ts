import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../../actions/auth/auth.actions';
import { UserInfo } from '../../models/user';

export const authFeatureKey = 'auth';

export interface State {
  user: UserInfo | null;
}

export const initialState: State = {
  user: null
};

export const reducer = createReducer(
  initialState,

  on(AuthActions.loginSuccess, (state, { user }) => ({ ...state, user })),
  on(AuthActions.logoutSuccess, state => ({ ...state, user: null })),

);
