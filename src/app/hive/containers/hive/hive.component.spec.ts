import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HiveService } from '../../services/hive.service';
import { HiveComponent } from './hive.component';

describe('HiveComponent', () => {
  let component: HiveComponent;
  let fixture: ComponentFixture<HiveComponent>;
  const hiveService = {
    getHives: jest.fn(),
    deleteHive: jest.fn()
  };

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [HiveComponent],
      imports: [
        MaterialModule,
        NoopAnimationsModule,
        RouterTestingModule,
        SharedModule,
      ],
      providers: [
        { provide: HiveService, useValue: hiveService }
      ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HiveComponent);
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
