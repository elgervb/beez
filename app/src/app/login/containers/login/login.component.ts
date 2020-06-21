import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, take, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';

import { LoginModel } from '../../login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading: boolean;
  error: string;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void { }

  cancel() {
    this.router.navigate(['/']);
  }

  submit(login: LoginModel) {
    delete this.error;
    this.loading = true;

    this.authService.login(login.username, login.password)
      .pipe(
        take(1),
        tap(
          () => this.router.navigate([this.route.snapshot.queryParams.returnUrl || '/']),
          error => { this.error = error; this.loading = false; }
        ),
        catchError(error => {
          this.error = error;
          this.loading = false;
          return error;
        })
      ).subscribe();
  }

}
