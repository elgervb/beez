import { Injectable } from '@angular/core';
import { AngularFireAuth, } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { User } from './user';

import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly user$: Observable<User | null>;

  constructor(private angularFireAuth: AngularFireAuth) {
    this.user$ = this.angularFireAuth.authState
      .pipe(
        share()
      );
  }

  isLoggedIn(): Observable<boolean> {
    return this.user$
      .pipe(
        map(user => !!user)
      );
  }

  signInWithGoogle(): Observable<void> {
    return from(this.angularFireAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider()));
  }

  logout(): Observable<void> {
    return from(this.angularFireAuth.signOut());
  }
}
