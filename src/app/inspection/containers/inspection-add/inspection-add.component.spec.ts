import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { InspectionService } from '../../services/inspection.service';
import { InspectionAddComponent } from './inspection-add.component';

describe('InspectionAddComponent', () => {
  let component: InspectionAddComponent;
  let fixture: ComponentFixture<InspectionAddComponent>;
  const inspectionService = { add: jest.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InspectionAddComponent],
      imports: [MaterialModule, NoopAnimationsModule, RouterTestingModule, ReactiveFormsModule, SharedModule],
      providers: [
        { provide: InspectionService, useValue: inspectionService }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
