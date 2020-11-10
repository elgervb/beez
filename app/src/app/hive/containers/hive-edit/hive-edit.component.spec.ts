import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LocationService } from 'src/app/location/services/location.service';

import { HiveFormComponent } from '../../components/hive-form/hive-form.component';
import { HiveService } from '../../services/hive.service';

import { HiveEditComponent } from './hive-edit.component';

describe('HiveEditComponent', () => {
  let component: HiveEditComponent;
  let fixture: ComponentFixture<HiveEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        HiveEditComponent,
        HiveFormComponent
      ],
      providers: [
        HiveService,
        LocationService
      ],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HiveEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
