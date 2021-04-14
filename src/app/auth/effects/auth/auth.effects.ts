import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap, map, tap } from 'rxjs/operators';

import * as AuthActions from '../../actions/auth/auth.actions';
import { UserInfo, User } from '../../models/user';
import { AuthService } from '../../services/auth.service';

function convertUserToUserInfo(user: User | null): UserInfo | null {
  if (!user) {
    return null;
  }

  const { displayName, uid, photoURL } = user;

  return {
    displayName,
    uid,
    photoURL
  };

}

@Injectable()
export class AuthEffects {

  checkLogin$ = createEffect(() => {
    return this.actions$.pipe(

      () => this.authService.user$
        .pipe(
          tap(user => console.log('EFFECT', user)),
          map(user => AuthActions.loginSuccess({ user: convertUserToUserInfo(user) }))
        )
    );
  });

  login$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(AuthActions.login),
      concatMap(
        () => this.authService.signInWithGoogle()
          .pipe(
            map(user => AuthActions.loginSuccess({ user }))
          )
      )
    );
  });

  logout$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(AuthActions.logout),
      concatMap(
        () => this.authService.logout()
          .pipe(
            map(() => AuthActions.logoutSuccess())
          )
      )
    );
  });

  constructor(
    private authService: AuthService,
    private actions$: Actions
  ) { }

}
