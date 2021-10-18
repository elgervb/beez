import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';
import { map, share, shareReplay, switchMap, tap } from 'rxjs/operators';
import { User } from '../models/user';

import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly user$: Observable<User | null>;

  get uid(): string | undefined {
    return this.userId;
  }

  private userId: string | undefined;

  constructor(private angularFireAuth: AngularFireAuth) {
    this.user$ = this.angularFireAuth.authState
      .pipe(
        tap(user => this.userId = user?.uid),
        shareReplay(1),
        share()
      );
  }

  isLoggedIn(): Observable<boolean> {
    return this.user$
      .pipe(map(user => !!user));
  }

  signInWithGoogle(): Observable<User | null> {
    return from(this.angularFireAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider()))
      .pipe(switchMap(() => this.user$));
  }

  logout(): Observable<void> {
    return from(this.angularFireAuth.signOut());
  }

}
