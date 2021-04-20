import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { cold, hot } from 'jasmine-marbles';

import { AuthEffects } from './auth.effects';
import { AuthService } from '../../services/auth.service';

import * as authActions from '../../actions/auth/auth.actions';
import { UserInfo } from '../../models/user';

describe('AuthEffects', () => {
  let actions$: Observable<any>;
  let effects: AuthEffects;

  const user: UserInfo = {
    displayName: 'this user',
    photoURL: 'https://asfd.png',
    uid: '1234'
  };

  const authService = {
    logout: jest.fn(),
    signInWithGoogle: jest.fn()
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        provideMockActions(() => actions$),
        { provide: AuthService, useValue: authService }
      ]
    });

    effects = TestBed.inject(AuthEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should login', () => {
    const action = authActions.login();
    const result = authActions.loginSuccess({ user });

    actions$ = hot('-a', { a: action });
    const response = cold('-a|', { a: user });
    authService.signInWithGoogle.mockReturnValue(response);

    const expected = cold('--b', { b: result });
    expect(effects.login$).toBeObservable(expected);
  });

  it('should logout', () => {
    const action = authActions.logout();
    const result = authActions.logoutSuccess();

    actions$ = hot('-a', { a: action });
    const response = cold('-a|', { a: user });
    authService.logout.mockReturnValue(response);

    const expected = cold('--b', { b: result });
    expect(effects.logout$).toBeObservable(expected);
  });

  it('should check login', () => {
    const action = authActions.checkLogin({ user });
    const result = authActions.loginSuccess({ user });

    actions$ = hot('-a', { a: action });

    const expected = cold('-b', { b: result });
    expect(effects.checkLogin$).toBeObservable(expected);
  });

});
