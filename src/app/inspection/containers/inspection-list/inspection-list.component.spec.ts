import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { transform } from '@elgervb/mock-data';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18nextTestingModule } from 'src/app/shared/testing/i18next/i18next.testing.module';
import { Inspection } from '../../models';
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
      imports: [I18nextTestingModule, MaterialModule, RouterTestingModule, SharedModule],
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

  describe('trendingIconName', () => {

    it('should go up', () => {
      const inspections = [
        transform<Inspection>({ health: 20 }),
        transform<Inspection>({ health: 10 }),
      ];

      expect(component.trendingIconName(inspections[0], inspections)).toBe('trending_up');
    });

    it('should go down', () => {
      const inspections = [
        transform<Inspection>({ health: 10 }),
        transform<Inspection>({ health: 20 }),
      ];

      expect(component.trendingIconName(inspections[0], inspections)).toBe('trending_down');
    });

    it('should stay the same', () => {
      const inspections = [
        transform<Inspection>({ health: 10 }),
        transform<Inspection>({ health: 10 }),
      ];

      // no list to compare to
      expect(component.trendingIconName(inspections[0])).toBe('compare_arrows');
      // not in the list
      expect(component.trendingIconName(transform<Inspection>({ health: 10 }), inspections)).toBe('compare_arrows');
      // stay the same
      expect(component.trendingIconName(inspections[0], inspections)).toBe('compare_arrows');
    });
  });
});
