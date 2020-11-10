import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared/shared.module';

import { InspectionFormComponent } from '../../components/inspection-form/inspection-form.component';
import { InspectionService } from '../../services/inspecton.service';

import { InspectionEditComponent } from './inspection-edit.component';

describe('InspectionEditComponent', () => {
  let component: InspectionEditComponent;
  let fixture: ComponentFixture<InspectionEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [InspectionEditComponent, InspectionFormComponent],
      providers: [InspectionService],
      imports: [HttpClientTestingModule, ReactiveFormsModule, RouterTestingModule, SharedModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(InspectionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
