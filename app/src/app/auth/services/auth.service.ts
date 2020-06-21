import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtTokenResponse } from '@common/jwt-response';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {

  token$: Observable<JwtTokenResponse>;

  private tokenSubject: BehaviorSubject<JwtTokenResponse>;

  constructor(private http: HttpClient) {
    this.tokenSubject = new BehaviorSubject<JwtTokenResponse>(JSON.parse(localStorage.getItem('token')));
    this.token$ = this.tokenSubject.asObservable();
  }

  get token(): JwtTokenResponse {
    return this.tokenSubject.value;
  }

  login(username: string, password: string): Observable<JwtTokenResponse> {
    return this.http.post<JwtTokenResponse>(`http://localhost:3000/login`, { username, password })
      .pipe(
        map(token => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('token', JSON.stringify(token));
          this.tokenSubject.next(token);
          return token;
        }
        ));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
  }
}
