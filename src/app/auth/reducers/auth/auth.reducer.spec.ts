import { reducer, initialState } from './auth.reducer';
import * as authActions from '../../actions/auth/auth.actions';
import { UserInfo } from '../../models/user';

describe('Auth Reducer', () => {

  const user: UserInfo = {
    displayName: 'this user',
    photoURL: 'https://asfd.png',
    uid: '1234'
  };

  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('a login action', () => {
    it('should new user state', () => {
      const action = authActions.loginSuccess({ user });

      const result = reducer(initialState, action);

      expect(result.user).toBe(user);
    });
  });

  describe('a logout action', () => {
    it('should new user state', () => {
      const action = authActions.logoutSuccess();

      const result = reducer({ ...initialState, user }, action);

      expect(result.user).toBeNull();
    });
  });
});
