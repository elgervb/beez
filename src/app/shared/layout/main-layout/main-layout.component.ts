import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { first, map, shareReplay, switchMap, take, tap } from 'rxjs/operators';
import { AuthService, UserInfo } from 'auth';
import { MatSidenav } from '@angular/material/sidenav';
import { PreferencesService } from '../../services/preferences.service';

@Component({
  selector: 'bee-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: [ './main-layout.component.css' ]
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
    private breakpointObserver: BreakpointObserver,
    private preferencesService: PreferencesService,
  ) { }

  logout(): void {
    this.authService.logout()
      .pipe(
        tap(() => this.router.navigate([ '/login' ])),
        first()
      ).subscribe();
  }

  navigate(drawer: MatSidenav): void {
    this.isHandset$
      .pipe(tap(isHandset => isHandset ? drawer.close() : '')).subscribe();
  }

  changeLanguage(lang: string): void {
    this.preferencesService.get()
      .pipe(
        map(prefs => prefs ? { ...prefs, language: lang } : prefs),
        switchMap(prefs => this.preferencesService.update(prefs)),
        tap(() => location.reload()),
        take(1)
      ).subscribe();
  }

}
