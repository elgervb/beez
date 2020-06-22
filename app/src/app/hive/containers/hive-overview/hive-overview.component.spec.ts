import { DialogModule } from '@angular/cdk-experimental/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared/shared.module';

import { HiveService } from '../../services/hive.service';

import { HiveOverviewComponent } from './hive-overview.component';

describe('HiveOverviewComponent', () => {
  let component: HiveOverviewComponent;
  let fixture: ComponentFixture<HiveOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HiveOverviewComponent],
      imports: [
        RouterTestingModule,
        SharedModule,
        DialogModule,
        HttpClientTestingModule
      ],
      providers: [
        HiveService,
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HiveOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
