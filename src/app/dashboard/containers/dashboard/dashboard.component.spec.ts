import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { DashboardComponent } from './dashboard.component';
import * as fromAuth from 'src/app/auth';

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

  it('should get the user', () => {
    const selectSpy = jest.spyOn(store, 'select');
    component.ngOnInit();

    expect(selectSpy).toHaveBeenCalledWith(fromAuth.selectUser);
  });
});
