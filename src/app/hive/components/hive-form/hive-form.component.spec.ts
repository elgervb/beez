import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { I18nextTestingModule, MaterialModule } from 'components';

import { HiveFormComponent } from './hive-form.component';

describe('HiveFormComponent', () => {
  let component: HiveFormComponent;
  let fixture: ComponentFixture<HiveFormComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ HiveFormComponent ],
      imports: [
        I18nextTestingModule,
        MaterialModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HiveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('only submits the form when valid', () => {
    const submitSpy = jest.spyOn(component.submitEvent, 'emit');

    component.submit();
    expect(submitSpy).not.toHaveBeenCalled();

    // make valid
    component.form.patchValue({
      date: new Date(),
      name: 'beez'
    });
    component.submit();
    expect(submitSpy).toHaveBeenCalled();
  });
});
