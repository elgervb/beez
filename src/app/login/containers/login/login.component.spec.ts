import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { AuthService } from 'auth';
import { MaterialModule } from 'components';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const authService = { signInWithGoogle: jest.fn() };

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        MaterialModule,
        MatIconTestingModule
      ],
      providers: [ { provide: AuthService, useValue: authService } ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login', () => {
    component.login();

    expect(authService.signInWithGoogle).toHaveBeenCalled();
  });
});
