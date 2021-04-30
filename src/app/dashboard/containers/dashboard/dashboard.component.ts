import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService, UserInfo } from 'src/app/auth';

@Component({
  selector: 'bee-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user$: Observable<UserInfo | null>;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.user$ = this.authService.user$;
  }

}
