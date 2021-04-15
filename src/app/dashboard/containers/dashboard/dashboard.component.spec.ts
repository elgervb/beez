import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { DashboardComponent } from './dashboard.component';

import * as fromAuth from 'src/app/auth';
import { Router } from '@angular/router';
import { UserInfo } from 'src/app/auth';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let store: MockStore;
  const user: UserInfo = {
    displayName: 'this user',
    photoURL: 'https://asfd.png',
    uid: '1234'
  };
  const initialState = { user };

  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [
        RouterTestingModule.withRoutes([{ path: 'login', children: [] }])
      ],
      providers: [
        provideMockStore(
          {
            initialState,
          }
        ),
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
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
