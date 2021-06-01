import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { InspectionService } from '../../services/inspection.service';

import { InspectionListComponent } from './inspection-list.component';

describe('InspectionListComponent', () => {
  let component: InspectionListComponent;
  let fixture: ComponentFixture<InspectionListComponent>;
  const inspectionService = {
    getInspections: jest.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InspectionListComponent],
      imports: [MaterialModule, SharedModule, RouterTestingModule],
      providers: [
        { provide: InspectionService, useValue: inspectionService }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
