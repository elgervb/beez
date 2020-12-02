import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(_: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.token && this.authService.token.access_token) {
      return true;
    }

    // not logged in so redirect to login page with the return url
    return this.router.createUrlTree(['login'], { queryParams: { returnUrl: state.url } });
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivate(childRoute, state);
  }
}
