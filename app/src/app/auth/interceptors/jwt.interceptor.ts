import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import * as fromAuth from '../';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private store: Store<fromAuth.State>) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // add authorization header with jwt token if available
    return this.store.select(fromAuth.selectToken)
      .pipe(
        map(token => token ? this.addToken(request, token) : undefined),
        switchMap(copy => next.handle(copy || request))
      );
  }

  private addToken(request: HttpRequest<unknown>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
