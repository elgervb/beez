import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterStateSnapshot, UrlTree } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { transform } from '@elgervb/mock-data';

import { AuthService } from '../services/auth.service';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        AuthService
      ]
    });
    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe('with access token', () => {

    beforeEach(() => jest.spyOn(authService, 'token', 'get').mockReturnValue({ access_token: 'my-valid-token' }));

    it('should return true when having a token', () => {
      expect(guard.canActivate(null, transform<RouterStateSnapshot>({ url: '/redirect' }))).toBe(true);
    });

  });

  describe('without valid access token', () => {

    it('should return a urltree without token', () => {
      const urlTree = guard.canActivate(null, transform<RouterStateSnapshot>({ url: '/redirect' })) as UrlTree;

      expect(urlTree.toString()).toBe('/login?returnUrl=%2Fredirect');
      expect(urlTree.queryParams.returnUrl).toBe('/redirect');
    });

    it('should return a urltree without access_token', () => {
      jest.spyOn(authService, 'token', 'get').mockReturnValue({ access_token: undefined });

      const urlTree = guard.canActivate(null, transform<RouterStateSnapshot>({ url: '/redirect' })) as UrlTree;

      expect(urlTree.toString()).toBe('/login?returnUrl=%2Fredirect');
      expect(urlTree.queryParams.returnUrl).toBe('/redirect');
    });

  });

});
