import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../auth/auth.service';

import firebase from 'firebase/app';
import { filter, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user$: Observable<firebase.User | null>;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.user$ = this.authService.user$
      .pipe(
        filter(user => !!user),
      );
  }

  logout(): void {
    this.authService.logout()
      .pipe(
        tap(() => this.router.navigate(['/login']))
      ).subscribe();
  }

}
