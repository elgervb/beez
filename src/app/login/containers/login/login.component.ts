import { Component } from '@angular/core';
import { AuthService } from 'auth';

@Component({
  selector: 'bee-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent {

  constructor(private authService: AuthService) { }

  login(): void {
    this.authService.signInWithGoogle();
  }

}
