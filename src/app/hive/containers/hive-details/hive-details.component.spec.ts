import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HiveService } from '../../services/hive.service';

import { HiveDetailsComponent } from './hive-details.component';

describe('HiveDetailsComponent', () => {
  let component: HiveDetailsComponent;
  let fixture: ComponentFixture<HiveDetailsComponent>;
  const hiveService: Partial<HiveService> = {
    getHive: jest.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HiveDetailsComponent],
      imports: [RouterTestingModule, MaterialModule, SharedModule, NgxQRCodeModule],
      providers: [
        { provide: HiveService, useValue: hiveService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HiveDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
