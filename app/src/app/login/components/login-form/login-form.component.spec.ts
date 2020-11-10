import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginFormComponent } from './login-form.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginFormComponent
      ],
      imports: [
        ReactiveFormsModule
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit when form is valid', () => {
    const submitSpy = jest.spyOn(component.submitEvent, 'emit');
    component.form.patchValue({
      username: 'test',
      password: 'test'
    });

    component.submit();
    expect(submitSpy).toHaveBeenCalledWith({
      username: 'test',
      password: 'test'
    });
  });

  it('should not submit when form is not valid', () => {
    const submitSpy = jest.spyOn(component.submitEvent, 'emit');
    component.form.patchValue({
      username: 'test'
    });

    component.submit();
    expect(submitSpy).not.toHaveBeenCalled();
  });

  it('should cancel', () => {
    const cancelSpy = jest.spyOn(component.cancelEvent, 'emit');

    component.cancel();

    expect(cancelSpy).toHaveBeenCalled();
  });
});
