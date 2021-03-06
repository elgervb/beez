import { CUSTOM_ELEMENTS_SCHEMA, SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Hive } from '@common/hive';
import { Location } from '@common/location';

import { HiveFormComponent } from './hive-form.component';

describe('HiveFormComponent', () => {
  let component: HiveFormComponent;
  let fixture: ComponentFixture<HiveFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HiveFormComponent],
      imports: [ReactiveFormsModule],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HiveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not submit when invalid', () => {
    const emitSpy = jest.spyOn(component.submitEvent, 'emit');

    component.submit();

    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('should submit when valid', () => {
    const emitSpy = jest.spyOn(component.submitEvent, 'emit');
    const hive: Hive = { id: null, name: 'my-hive', number: 1, location: null, type: '' };
    component.form.patchValue(hive);

    component.submit();

    expect(emitSpy).toHaveBeenCalledWith(hive);
  });

  it('should update form onChanges edit', () => {
    expect(component.form.get('name').value).toBeFalsy();

    component.ngOnChanges({ edit: new SimpleChange(undefined, { name: 'my-name' }, true) });

    expect(component.form.get('name').value).toBe('my-name');
  });

  it('should compare locations', () => {
    const location: Location = {
      name: 'a',
      lat: 51,
      long: 5
    };
    expect(component.compareLocations(null, null)).toBe(true);
    expect(component.compareLocations(location, location)).toBe(true);
    expect(component.compareLocations(location, { ...location })).toBe(true);
    expect(component.compareLocations(location, { ...location, name: 'b' })).toBe(false);
  });

  it('should track locations', () => {
    const location: Location = {
      name: 'a',
      lat: 51,
      long: 5
    };
    expect(component.trackLocation(null, location)).toBe('a');
  });
});
