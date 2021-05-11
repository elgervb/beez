import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, first, tap } from 'rxjs/operators';
import { AuthService, UserInfo } from 'src/app/auth';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'bee-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  user$: Observable<UserInfo | null> = this.authService.user$;

  constructor(
    private authService: AuthService,
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) { }

  logout(): void {
    this.authService.logout()
      .pipe(
        tap(() => this.router.navigate(['/login'])),
        first()
      ).subscribe();
  }

  navigate(drawer: MatSidenav): void {
    this.isHandset$
      .pipe(
        tap(isHandset => isHandset ? drawer.close() : '')
      ).subscribe();
  }
}
