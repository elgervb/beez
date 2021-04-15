import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { LoginComponent } from './login.component';

import * as fromAuth from 'src/app/auth';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let store: MockStore;
  const initialState = { user: null };

  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        provideMockStore({ initialState }),
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    component.login();

    expect(dispatchSpy).toHaveBeenCalledWith(fromAuth.login());
  });
});
