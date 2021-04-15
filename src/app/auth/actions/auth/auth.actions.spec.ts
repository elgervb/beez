import { transform } from '@elgervb/mock-data';
import { User, UserInfo } from '../../models/user';
import * as fromAuth from './auth.actions';

describe('actions', () => {
  const user: UserInfo = {
    displayName: 'this user',
    photoURL: 'https://asfd.png',
    uid: '1234'
  };

  it('should return an logout action', () => {
    expect(fromAuth.logout().type).toBe('[Auth] Logout');
    expect(fromAuth.logoutSuccess().type).toBe('[Auth] LogoutSuccess');
  });

  it('should return an login action', () => {
    expect(fromAuth.login().type).toBe('[Auth] Login');
    expect(fromAuth.loginSuccess({ user: transform<UserInfo>(user) }).type).toBe('[Auth] LoginSuccess');
  });

  it('should return an check login action', () => {
    expect(fromAuth.checkLogin({ user: transform<UserInfo>(user) }).type).toBe('[Auth] CheckLogin');
  });
});
