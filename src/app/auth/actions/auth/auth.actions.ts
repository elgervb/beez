import { createAction, props } from '@ngrx/store';
import { UserInfo } from '../../models/user';

export const checkLogin = createAction(
  '[Auth] CheckLogin'
);

export const login = createAction(
  '[Auth] Login'
);
export const loginSuccess = createAction(
  '[Auth] LoginSuccess',
  props<{ user: UserInfo | null }>()
);

export const logout = createAction(
  '[Auth] Logout'
);

export const logoutSuccess = createAction(
  '[Auth] LogoutSuccess'
);
