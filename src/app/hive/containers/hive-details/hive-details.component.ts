import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { I18NEXT_SERVICE, ITranslationService } from 'angular-i18next';
import { Observable } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { ConfirmComponent, ConfirmDialogData } from 'src/app/shared/components/dialogs/confirm/confirm.component';
import { QRBeezModel } from 'src/app/shared/models';
import { QRDialog, QrDialogComponent } from '../../components/qr-dialog/qr-dialog.component';
import { Hive } from '../../models';
import { HiveService } from '../../services/hive.service';

@Component({
  selector: 'bee-hive-details',
  templateUrl: './hive-details.component.html',
  styleUrls: ['./hive-details.component.css']
})
export class HiveDetailsComponent implements OnInit {

  hive$?: Observable<Hive | undefined>;

  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;

  get qrValue(): string {
    const value: QRBeezModel = {
      type: 'hive',
      id: this.hiveId || ''
    };
    return JSON.stringify(value);
  }

  get hiveId(): string | null {
    return this.route.snapshot.paramMap.get('hiveId');
  }

  get dense(): string | null {
    return this.route.snapshot.data.dense;
  }

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private hiveService: HiveService,
    @Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService
  ) { }

  ngOnInit(): void {
    const hiveId = this.hiveId;
    if (hiveId) {
      this.hive$ = this.hiveService.getHive(hiveId);
    }
  }

  back(): void {
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  deleteHive(hive: Hive, event?: MouseEvent): void {
    event?.stopPropagation();
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
        switchMap(
          () => this.hiveService.deleteHive(hive)
            .pipe(
              tap(() => this.back())
            )
        )
      )
      .subscribe();
  }

  navigateToEdit(): void {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  navigateToInspections(): void {
    this.router.navigate(['inspections'], { relativeTo: this.route });
  }

  printQRcode(): void {
    this.dialog.open<QrDialogComponent, QRDialog, void>(QrDialogComponent, {
      backdropClass: 'white-backdrop',
      panelClass: 'qr-dialog',
      data: {
        elementType: this.elementType,
        correctionLevel: this.correctionLevel,
        qrValue: this.qrValue
      }
    });
  }
}
