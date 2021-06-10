import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { InspectionService } from '../../services/inspection.service';
import { InspectionAddComponent } from './inspection-add.component';
import * as utilsModule from 'src/app/shared/utils/route/get-param';
import { Location } from '@angular/common';
import { of } from 'rxjs';

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

  it('should format label', () => {
    expect(component.formatLabel(10)).toBe('10%');
    expect(component.formatLabel(0)).toBe('');
  });

  it('should not submit without hiveId', () => {
    component.submit();

    expect(inspectionService.add).not.toHaveBeenCalled();
  });

  it('should submit and return to previous page', () => {
    const getParamSpy = jest.spyOn(utilsModule, 'getParam').mockReturnValueOnce('hiveId');
    inspectionService.add.mockReturnValueOnce(of(''));
    const backSpy = jest.spyOn(TestBed.inject(Location), 'back');

    component.submit();

    expect(getParamSpy).toHaveBeenCalled();
    expect(inspectionService.add).toHaveBeenCalled();
    expect(backSpy).toHaveBeenCalled();
  });
});