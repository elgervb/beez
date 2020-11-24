import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import * as fromAuth from '../';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private store: Store<fromAuth.State>,
  ) { }

  canActivate(_: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select(fromAuth.getToken)
      .pipe(
        map(token => !!token),
        map(hasToken => hasToken ? true : this.router.createUrlTree(['login'], { queryParams: { returnUrl: state.url } }))
      );
  }

}
