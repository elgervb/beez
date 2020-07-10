import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { JwtTokenResponse } from '@common/jwt-response';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let testMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(AuthService);
    testMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should logout', () => {
    window.localStorage.setItem('token', 'my-token');
    expect(window.localStorage.getItem('token')).toBe('my-token');

    service.logout();

    expect(window.localStorage.getItem('token')).toBeNull();
  });

  it('should login', () => {

    service.login('username', 'password').subscribe(t => {
      expect(t.access_token).toBeTruthy();
    });

    const token: JwtTokenResponse = { access_token: 'my-token' };
    const request = testMock.expectOne('https://localhost:3000/login');
    expect(request.request.method).toBe('POST');

    request.flush({ token });
    testMock.verify();
  });
});
