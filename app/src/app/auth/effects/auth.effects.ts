import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, tap } from 'rxjs/operators';

import * as AuthActions from '../actions/auth.actions';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthEffects {

  login$ = createEffect(() => this.actions$
    .pipe(
      ofType(AuthActions.login),
      concatMap(action => this.authService.login(action.username, action.password)
        .pipe(
          map(data => AuthActions.loginSuccess({ data })),
          tap(result => localStorage.setItem('token', result.data.access_token)),
          catchError(error => of(AuthActions.loginFailure({ error }))))
      )
    ));

  logout$ = createEffect(() => this.actions$
    .pipe(
      ofType(AuthActions.logout),
      tap(() => this.authService.logout())
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) { }

}
