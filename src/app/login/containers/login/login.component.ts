import { Component, OnInit } from '@angular/core';
import { AuthService } from 'auth';

@Component({
  selector: 'bee-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

  }

  login(): void {
    this.authService.signInWithGoogle();
  }

}
