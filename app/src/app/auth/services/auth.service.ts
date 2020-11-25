import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtTokenResponse } from '@common/jwt-response';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const { apiUrl } = environment;

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<JwtTokenResponse> {
    return this.http.post<JwtTokenResponse>(`${apiUrl}/login`, { username, password });
  }

  logout() {
    localStorage.removeItem('token');
  }
}
