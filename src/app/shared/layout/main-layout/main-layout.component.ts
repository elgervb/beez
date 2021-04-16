import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, shareReplay, filter, first, tap } from 'rxjs/operators';
import * as fromAuth from 'src/app/auth';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private store: Store<fromAuth.State>,
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) { }

  logout(): void {
    this.store.dispatch(fromAuth.logout());

    const user$ = this.store.select(fromAuth.selectUser);

    user$.pipe(
      filter(user => !user),
      tap(() => this.router.navigate(['/login'])),
      first()
    ).subscribe();
  }
}
