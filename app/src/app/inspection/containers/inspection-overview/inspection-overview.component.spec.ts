import { Dialog, DialogModule } from '@angular/cdk-experimental/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared/shared.module';

import { InspectionService } from '../../services/inspecton.service';

import { InspectionOverviewComponent } from './inspection-overview.component';

describe('InspectionOverviewComponent', () => {
  let component: InspectionOverviewComponent;
  let fixture: ComponentFixture<InspectionOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InspectionOverviewComponent],
      providers: [InspectionService, Dialog],
      imports: [RouterTestingModule, SharedModule, HttpClientTestingModule, DialogModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
