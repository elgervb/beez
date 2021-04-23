import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { take } from 'rxjs/operators';
import { UserInfo } from './models/user';

export function isLoggedInFactory(authService: AuthService): () => Promise<UserInfo | null> {
  return () => {
    return authService.user$
      .pipe(
        take(1)
      ).toPromise();
  };
}
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: isLoggedInFactory, deps: [AuthService], multi: true }
  ]
})
export class AuthModule { }
