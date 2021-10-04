import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { take } from 'rxjs/operators';
import { UserInfo } from './models/user';
import { lastValueFrom } from 'rxjs';

export const isLoggedInFactory = (authService: AuthService): () => Promise<UserInfo | null> =>
  () => lastValueFrom(authService.user$
    .pipe(
      take(1)
    ));

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
