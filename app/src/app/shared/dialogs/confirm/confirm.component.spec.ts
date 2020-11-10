import { DialogModule, DialogRef } from '@angular/cdk-experimental/dialog';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConfirmComponent } from './confirm.component';

describe('ConfirmComponent', () => {
  let component: ConfirmComponent;
  let fixture: ComponentFixture<ConfirmComponent>;

  const dialogRef = { close: jest.fn() };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        DialogModule
      ],
      declarations: [
        ConfirmComponent
      ],
      providers: [
        { provide: DialogRef, useValue: dialogRef }
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close', () => {
    component.close(true);
    expect(dialogRef.close).toHaveBeenCalledWith(true);
  });
});
