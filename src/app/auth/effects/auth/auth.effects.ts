import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap, map } from 'rxjs/operators';

import * as AuthActions from '../../actions/auth/auth.actions';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class AuthEffects {

  checkLogin$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(AuthActions.checkLogin),
      map(action => AuthActions.loginSuccess({ user: action.user }))
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
