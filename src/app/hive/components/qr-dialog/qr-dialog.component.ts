import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';

export interface QRDialog {
  elementType: NgxQrcodeElementTypes;
  correctionLevel: NgxQrcodeErrorCorrectionLevels;
  qrValue: string;
}

@Component({
  selector: 'bee-qr-dialog',
  templateUrl: './qr-dialog.component.html',
  styleUrls: [ './qr-dialog.component.css' ]
})
export class QrDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: QRDialog) { }

  ngOnInit(): void {
  }

  print(): void {
    window.print();
  }

}
