import { Location } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent, ConfirmDialogData } from 'src/app/shared/components/dialogs/confirm/confirm.component';
import { Exception, Result } from '@zxing/library';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { QRBeezModel } from 'src/app/shared/models';
import { I18NEXT_SERVICE, ITranslationService } from 'angular-i18next';
@Component({
  selector: 'bee-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: [ './scanner.component.css' ]
})
export class ScannerComponent implements OnInit {

  @ViewChild(ZXingScannerComponent)
  scanner: ZXingScannerComponent;

  private nrOfTries = 0;

  constructor(
    private location: Location,
    private dialog: MatDialog,
    private router: Router,
    @Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService
  ) { }

  ngOnInit(): void { }

  cancel(): void {
    this.location.back();
  }

  camerasNotFoundHandler(error?: Error): void {
    console.log('camerasNotFoundHandler', error);
  }

  scanSuccessHandler(json: string): void {
    this.scanner.scanStop();

    const result: QRBeezModel = JSON.parse(json);
    let route: string[];

    switch (result.type) {
    case 'hive':
      route = [ '/hives', result.id ];
      break;
    case 'queen':
      route = [ '/queens', result.id ];
      break;
    default:
      throw new Error(`no such type found ${result.type}`);
    }

    this.router.navigate(route);
  }

  scanErrorHandler(error: Error): void {
    console.log('scanErrorHandler', error);
  }

  scanFailureHandler(_: Exception | undefined): void {
    this.nrOfTries++;

    if (this.nrOfTries % 25 === 0) {
      this.scanner.scanStop();
      this.dialog.open<ConfirmComponent, ConfirmDialogData, boolean>(
        ConfirmComponent,
        { data: { title: this.i18NextService.format('scanner', 'cap'), content: this.i18NextService.t('sentence.noQRcode') } }
      ).afterClosed()
        .pipe(tap(confirm => confirm ? this.scanner.scanStart() : this.location.back()))
        .subscribe();
    }
  }

  scanCompleteHandler(_: Result): void {

  }

}
