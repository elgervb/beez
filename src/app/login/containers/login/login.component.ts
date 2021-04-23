import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth';

@Component({
  selector: 'app-login',
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
