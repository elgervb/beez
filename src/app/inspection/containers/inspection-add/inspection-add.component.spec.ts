import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'components';
import { SharedModule } from 'src/app/shared/shared.module';
import { InspectionService } from '../../services/inspection.service';
import { InspectionAddComponent } from './inspection-add.component';
import { Location } from '@angular/common';
import { of } from 'rxjs';
import { I18nextTestingModule } from 'src/app/shared/testing/i18next/i18next.testing.module';
import { ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('InspectionAddComponent', () => {
  let component: InspectionAddComponent;
  let fixture: ComponentFixture<InspectionAddComponent>;
  const inspectionService = { add: jest.fn() };

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ InspectionAddComponent ],
      imports: [ I18nextTestingModule, MaterialModule, NoopAnimationsModule, ReactiveFormsModule, RouterTestingModule, SharedModule ],
      providers: [ { provide: InspectionService, useValue: inspectionService } ],
      schemas: [ NO_ERRORS_SCHEMA ],
      teardown: { destroyAfterEach: false }
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

  it('should format label', () => {
    expect(component.formatLabel(10)).toBe('10%');
    expect(component.formatLabel(0)).toBe('');
  });

  it('should not submit without hiveId', () => {
    component.submit();

    expect(inspectionService.add).not.toHaveBeenCalled();
  });

  it('should submit and return to previous page', () => {
    const route = TestBed.inject(ActivatedRoute);
    const getParamSpy = jest.spyOn(route.snapshot.paramMap, 'get').mockReturnValueOnce('hiveId');
    inspectionService.add.mockReturnValueOnce(of(''));
    const backSpy = jest.spyOn(TestBed.inject(Location), 'back');

    component.submit();

    expect(getParamSpy).toHaveBeenCalled();
    expect(inspectionService.add).toHaveBeenCalled();
    expect(backSpy).toHaveBeenCalled();
  });
});
