import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels, NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18nextTestingModule } from 'src/app/shared/testing/i18next/i18next.testing.module';

import { QRDialog, QrDialogComponent } from './qr-dialog.component';

describe('QrDialogComponent', () => {
  let component: QrDialogComponent;
  let fixture: ComponentFixture<QrDialogComponent>;
  const data: QRDialog = {
    correctionLevel: NgxQrcodeErrorCorrectionLevels.HIGH,
    elementType: NgxQrcodeElementTypes.URL,
    qrValue: 'my_string'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrDialogComponent ],
      imports: [
        I18nextTestingModule,
        MaterialModule,
        NgxQRCodeModule,
        SharedModule
      ],
      providers: [ { provide: MAT_DIALOG_DATA, useValue: data } ]
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
