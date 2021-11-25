import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from 'components';
import { DashboardComponent } from './dashboard.component';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { I18nextTestingModule } from 'src/app/shared/testing/i18next/i18next.testing.module';

describe('DashboardComponent', () => {
  let component: DashboardComponent;

  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports: [
        I18nextTestingModule,
        MaterialModule,
        MatIconTestingModule
      ],
      teardown: { destroyAfterEach: false }
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
});
