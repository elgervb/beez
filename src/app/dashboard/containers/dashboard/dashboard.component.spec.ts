import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { AuthService, UserInfo } from 'src/app/auth';
import { from } from '@elgervb/mock-data';
import { of } from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  const user = from<UserInfo>('user');
  const authService = { user$: of(user) };

  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      providers: [
        { provide: AuthService, useValue: authService }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the user', () => {
    expect(component.user$).toBe(authService.user$);
  });
});
