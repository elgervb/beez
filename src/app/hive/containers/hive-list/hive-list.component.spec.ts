import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18nextTestingModule } from 'src/app/shared/testing/i18next/i18next.testing.module';
import { HiveService } from '../../services/hive.service';
import { HiveListComponent } from './hive-list.component';

describe('HiveListComponent', () => {
  let component: HiveListComponent;
  let fixture: ComponentFixture<HiveListComponent>;
  const hiveService = {
    getHives: jest.fn(),
    deleteHive: jest.fn()
  };

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ HiveListComponent ],
      imports: [
        I18nextTestingModule,
        MaterialModule,
        NoopAnimationsModule,
        RouterTestingModule,
        SharedModule,
      ],
      providers: [ { provide: HiveService, useValue: hiveService } ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HiveListComponent);
    component = fixture.componentInstance;

    hiveService.getHives.mockReturnValue(of());

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
