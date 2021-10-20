import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels, NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { I18nextTestingModule } from 'components';
import { MaterialModule } from '../../material.module';

import { QRDialog, QrDialogComponent } from './qr-dialog.component';

describe('QrDialogComponent', () => {
  let component: QrDialogComponent;
  let fixture: ComponentFixture<QrDialogComponent>;
  const data: QRDialog = {
    correctionLevel: NgxQrcodeErrorCorrectionLevels.HIGH,
    elementType: NgxQrcodeElementTypes.URL,
    qrValue: 'my_string'
  };

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ QrDialogComponent ],
      imports: [
        I18nextTestingModule,
        MaterialModule,
        NgxQRCodeModule,
      ],
      providers: [ { provide: MAT_DIALOG_DATA, useValue: data } ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QrDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
