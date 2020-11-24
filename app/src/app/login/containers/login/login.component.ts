import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';

import * as fromAuth from '../../../auth';
import { LoginModel } from '../../login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error$: Observable<string>;

  constructor(
    private store: Store<fromAuth.State>,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.store.select(fromAuth.getToken)
      .pipe(
        map(token => !!token),
        filter(hasToken => hasToken),
        tap(() => this.router.navigate([this.route.snapshot.queryParams.returnUrl || '/'])),
        take(1)
      ).subscribe();

    this.error$ = this.store.select(fromAuth.getError);
  }

  cancel() {
    this.router.navigate(['/']);
  }

  submit(loginModel: LoginModel) {
    this.store.dispatch(fromAuth.login({ ...loginModel }));
  }

}
