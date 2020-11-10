import { DialogModule } from '@angular/cdk-experimental/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared/shared.module';

import { QueenService } from '../../services/queen.service';

import { QueenOverviewComponent } from './queen-overview.component';

describe('QueenOverviewComponent', () => {
  let component: QueenOverviewComponent;
  let fixture: ComponentFixture<QueenOverviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [QueenOverviewComponent],
      imports: [
        RouterTestingModule,
        SharedModule,
        DialogModule,
        HttpClientTestingModule
      ],
      providers: [QueenService],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueenOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
