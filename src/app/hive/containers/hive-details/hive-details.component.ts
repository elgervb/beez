import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { I18NEXT_SERVICE, ITranslationService } from 'angular-i18next';
import { Observable } from 'rxjs';
import { filter, switchMap, take, tap } from 'rxjs/operators';
import { BottomSheetComponent, ConfirmComponent, ConfirmDialogData, SheetActions } from 'components';
import { QRBeezModel } from 'src/app/shared/models';
import { QRDialog, QrDialogComponent } from '../../components';
import { Hive } from '../../models';
import { HiveService } from '../../services/hive.service';

const sheetActions: SheetActions = {
  actions: [
    { type: 'edit', transKey: 'edit' },
    { type: 'printQR', transKey: 'printQR' },
    { type: 'delete', transKey: 'delete' },
  ]
};

@Component({
  selector: 'bee-hive-details',
  templateUrl: './hive-details.component.html',
  styleUrls: [ './hive-details.component.css' ]
})
export class HiveDetailsComponent implements OnInit {

  hive$?: Observable<Hive | undefined>;

  get hiveId(): string | null {
    return this.route.snapshot.paramMap.get('hiveId');
  }

  get dense(): string | null {
    return this.route.snapshot.data.dense as string;
  }

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private hiveService: HiveService,
    private bottomSheet: MatBottomSheet,
    @Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService
  ) { }

  ngOnInit(): void {
    const { hiveId } = this;
    if (hiveId) {
      this.hive$ = this.hiveService.getHive(hiveId);
    }
  }

  back(): void {
    this.router.navigate([ '..' ], { relativeTo: this.route });
  }

  deleteHive(hive: Hive): void {
    this.dialog.open<ConfirmComponent, ConfirmDialogData, boolean>(
      ConfirmComponent,
      {
        data: {
          title: `${this.i18NextService.format('delete', 'cap')} ${this.i18NextService.t('hive')}`,
          content: this.i18NextService.t('sentence.confirmDelete', { replace: { what: hive.name } })
        }
      }
    ).afterClosed()
      .pipe(
        filter(confirm => !!confirm),
        switchMap(() => this.hiveService.deleteHive(hive)
          .pipe(tap(() => this.back())))
      )
      .subscribe();
  }

  navigateToEdit(): void {
    this.router.navigate([ 'edit' ], { relativeTo: this.route });
  }

  navigateToInspections(): void {
    this.router.navigate([ 'inspections' ], { relativeTo: this.route });
  }

  openBottomSheet(hive: Hive): void {
    const sheet = this.bottomSheet.open<BottomSheetComponent, SheetActions>(BottomSheetComponent, {
      data: sheetActions,
      closeOnNavigation: true
    });
    sheet.instance.action$
      .pipe(
        tap(action => {
          switch (action) {
            case 'edit':
              this.navigateToEdit();
              break;
            case 'delete':
              this.deleteHive(hive);
              break;
            case 'printQR':
              this.printQRcode();
              break;
            default:
              throw new Error('no such action');
          }
          sheet.dismiss();
        }),
        take(1)
      ).subscribe();
  }

  printQRcode(): void {
    const value: QRBeezModel = {
      type: 'hive',
      id: this.hiveId || ''
    };

    this.dialog.open<QrDialogComponent, QRDialog, void>(QrDialogComponent, {
      backdropClass: 'white-backdrop',
      panelClass: 'qr-dialog',
      data: {
        elementType: NgxQrcodeElementTypes.URL,
        correctionLevel: NgxQrcodeErrorCorrectionLevels.HIGH,
        qrValue: JSON.stringify(value)
      }
    });
  }

}
