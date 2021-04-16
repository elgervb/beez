import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
  ) { }

  ngOnInit(): void {
    this.user$ = this.store.select(fromAuth.selectUser);
  }

}
