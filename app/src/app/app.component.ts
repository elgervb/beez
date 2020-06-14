import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'beez';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() { }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
