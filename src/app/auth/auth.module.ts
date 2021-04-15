import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store, StoreModule } from '@ngrx/store';
import * as fromAuth from './index';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './effects/auth/auth.effects';
import { AuthService } from './services/auth.service';
import { map, take, tap } from 'rxjs/operators';
import { convertUserToUserInfo } from './convert-user-to-userinfo';
import { UserInfo } from './models/user';

export function isLoggedInFactory(authService: AuthService, store: Store): () => Promise<UserInfo | null> {
  return () => {
    return authService.user$
      .pipe(
        map(user => convertUserToUserInfo(user)),
        tap(user => store.dispatch(fromAuth.checkLogin({ user }))),
        take(1)
      ).toPromise();
  };
}
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducer),
    EffectsModule.forFeature([AuthEffects])
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: isLoggedInFactory, deps: [AuthService, Store], multi: true }
  ]
})
export class AuthModule { }
