import { LayoutModule } from '@angular/cdk/layout';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MainLayoutComponent } from './main-layout.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import * as fromAuth from 'src/app/auth';
import { Router } from '@angular/router';

describe('MainLayoutComponent', () => {
  let component: MainLayoutComponent;
  let fixture: ComponentFixture<MainLayoutComponent>;
  let store: MockStore;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MainLayoutComponent],
      imports: [
        LayoutModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
        NoopAnimationsModule,
        RouterTestingModule.withRoutes([{ path: 'login', children: [] }]),
      ],
      providers: [
        provideMockStore<fromAuth.State>(
          {
            initialState: fromAuth.initialState,
            selectors: [
              {
                selector: fromAuth.selectUser,
                value: fromAuth.initialState.user
              }
            ]
          },
        )
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.inject(MockStore);
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('should logout', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    component.logout();

    expect(dispatchSpy).toHaveBeenCalledWith(fromAuth.logout());
  });

  it('should navigate on logout', () => {

    store.overrideSelector(fromAuth.selectUser, null);
    store.refreshState();

    const navigateSpy = jest.spyOn(TestBed.inject(Router), 'navigate');
    component.logout();

    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });
});
