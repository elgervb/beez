import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared/shared.module';

import { InspectionFormComponent } from './inspection-form.component';

describe('InspectionFormComponent', () => {
  let component: InspectionFormComponent;
  let fixture: ComponentFixture<InspectionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InspectionFormComponent],
      imports: [ReactiveFormsModule, RouterTestingModule, SharedModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
