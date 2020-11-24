import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, take, tap } from 'rxjs/operators';

import * as fromAuth from './auth';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'beez';

  constructor(
    private store: Store<fromAuth.State>,
    private router: Router
  ) { }

  ngOnInit() { }

  logout() {
    this.store.select(fromAuth.selectToken)
      .pipe(
        filter(token => !token),
        tap(() => this.router.navigate(['/login'])),
        take(1)
      );
    this.store.dispatch(fromAuth.logout());
  }
}
