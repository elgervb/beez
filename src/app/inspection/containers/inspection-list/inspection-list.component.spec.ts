import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { transform } from '@elgervb/mock-data';
import { MaterialModule } from 'components';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18nextTestingModule } from 'src/app/shared/testing/i18next/i18next.testing.module';
import { InspectionDetailsComponent } from '../../components';
import { Inspection } from '../../models';
import { HoneyProgressPipe, QueenPresentColorPipe, TrendingIconNamePipe } from '../../pipes';
import { InspectionService } from '../../services/inspection.service';

import { InspectionListComponent } from './inspection-list.component';

describe('InspectionListComponent', () => {
  let component: InspectionListComponent;
  let fixture: ComponentFixture<InspectionListComponent>;
  const inspectionService = {
    getInspections: jest.fn()
  };

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ InspectionListComponent, InspectionDetailsComponent, HoneyProgressPipe, QueenPresentColorPipe, TrendingIconNamePipe ],
      imports: [ I18nextTestingModule, MaterialModule, RouterTestingModule, SharedModule ],
      providers: [ { provide: InspectionService, useValue: inspectionService } ],
      schemas: [ NO_ERRORS_SCHEMA ]
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

  describe('select', () => {
    it('selects an inspection', () => {
      const inspection = transform<Inspection>({});
      expect(component.selected).toBeUndefined();

      component.select(inspection);
      expect(component.selected).toBe(inspection);
    });

    it('deselects an inspection', () => {
      const inspection = transform<Inspection>({});

      component.select(inspection);
      component.select(inspection);
      expect(component.selected).toBeUndefined();
    });
  });
});
