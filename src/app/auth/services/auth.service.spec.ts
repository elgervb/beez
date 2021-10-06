import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { transform } from '@elgervb/mock-data';
import { Observable, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { User } from '../models/user';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let angularFireAuth: AngularFireAuth;
  const userSubject = new Subject<User | null>();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AngularFireAuth,
          useValue: {
            authState: userSubject,
            signInWithRedirect: jest.fn(() => Promise.resolve()),
            signOut: jest.fn(() => Promise.resolve())
          }
        }
      ]
    });
    service = TestBed.inject(AuthService);
    angularFireAuth = TestBed.inject(AngularFireAuth);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should state that a user is logged on', done => {
    service.isLoggedIn().pipe(take(1)).subscribe({
      next: loggedIn => {
        expect(loggedIn).toBeTruthy();
        done();
      }
    });
    userSubject.next(transform<User>({}));
  });

  it('should state that a user is not logged on', done => {
    service.isLoggedIn().pipe(take(1)).subscribe({
      next: loggedIn => {
        expect(loggedIn).toBeFalsy();
        done();
      }
    });
    userSubject.next(null);
  });

  it('should sign in with google', () => {
    const result = service.signInWithGoogle();

    expect(angularFireAuth.signInWithRedirect).toHaveBeenCalled();
    expect(result).toBeInstanceOf(Observable);
  });

  it('should logout', () => {
    const result = service.logout();

    expect(angularFireAuth.signOut).toHaveBeenCalled();
    expect(result).toBeInstanceOf(Observable);
  });
});
