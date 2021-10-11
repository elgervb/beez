import { LayoutModule } from '@angular/cdk/layout';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MainLayoutComponent } from './main-layout.component';
import { RouterTestingModule } from '@angular/router/testing';

import { Router } from '@angular/router';
import { MaterialModule } from '../../material/material.module';
import { AuthService, UserInfo } from 'src/app/auth';
import { of } from 'rxjs';
import { from } from '@elgervb/mock-data';
import { I18nextTestingModule } from '../../testing/i18next/i18next.testing.module';

describe('MainLayoutComponent', () => {
  let component: MainLayoutComponent;
  let fixture: ComponentFixture<MainLayoutComponent>;

  const user = from<UserInfo>('user');
  const authService = {
    user$: of(user),
    logout: jest.fn().mockReturnValue(of({}))
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MainLayoutComponent ],
      imports: [
        I18nextTestingModule,
        LayoutModule,
        MaterialModule,
        NoopAnimationsModule,
        RouterTestingModule.withRoutes([ { path: 'login', children: [] } ]),
      ],
      providers: [ { provide: AuthService, useValue: authService } ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('should logout', () => {
    component.logout();

    expect(authService.logout).toHaveBeenCalled();
  });

  it('should navigate on logout', () => {
    const navigateSpy = jest.spyOn(TestBed.inject(Router), 'navigate');
    component.logout();

    expect(navigateSpy).toHaveBeenCalledWith([ '/login' ]);
  });

  it('should get the user', () => {
    expect(component.user$).toBe(authService.user$);
  });

});
