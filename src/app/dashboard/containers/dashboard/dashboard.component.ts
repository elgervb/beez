import { Component, OnInit } from '@angular/core';

import { filter, first, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserInfo } from 'src/app/auth';
import * as fromAuth from 'src/app/auth';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user$: Observable<UserInfo | null>;

  constructor(
    private store: Store<fromAuth.State>,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user$ = this.store.select(fromAuth.selectUser);
  }

  logout(): void {
    this.store.dispatch(fromAuth.logout());

    this.user$.pipe(
      filter(user => !user),
      tap(() => this.router.navigate(['/login'])),
      first()
    ).subscribe();
  }

}
