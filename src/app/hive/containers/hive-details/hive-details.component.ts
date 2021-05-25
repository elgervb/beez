import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { Observable } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { ConfirmComponent, ConfirmDialogData } from 'src/app/shared/components/dialogs/confirm/confirm.component';
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
  get qrUrl(): string {
    return window.location.href;
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
    private hiveService: HiveService
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
      { data: { title: 'Delete hive', content: `Are you sure you want to delete hive ${hive.name}?` } }
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

  navigateToAddInspection(hiveId: string | null): void {
    if (hiveId) {
      this.router.navigate(['inspections/add'], { relativeTo: this.route });
    }
  }
}
