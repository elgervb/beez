import { Component, OnInit } from '@angular/core';
import { LoginModel } from '../../login';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { take, tap } from 'rxjs/operators';

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
        )
      ).subscribe();
  }

}
