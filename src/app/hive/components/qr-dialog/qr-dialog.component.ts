import { Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';

export interface QRDialog {
  elementType: NgxQrcodeElementTypes;
  correctionLevel: NgxQrcodeErrorCorrectionLevels;
  qrValue: string;
}

export const cssClass = 'qr-print-class';

@Component({
  selector: 'bee-qr-dialog',
  templateUrl: './qr-dialog.component.html',
  styleUrls: [ './qr-dialog.component.css' ]
})
export class QrDialogComponent implements OnInit, OnDestroy {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: QRDialog,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.renderer.addClass(document.body, cssClass);
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, cssClass);
  }

  print(): void {
    window.print();
  }

}
