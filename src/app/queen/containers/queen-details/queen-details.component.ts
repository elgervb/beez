import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { I18NEXT_SERVICE, ITranslationService } from 'angular-i18next';
import { Observable } from 'rxjs';
import { filter, switchMap, take, tap } from 'rxjs/operators';
import { BottomSheetComponent, SheetActions } from 'components';
import { ConfirmComponent, ConfirmDialogData } from 'src/app/shared/components/dialogs/confirm/confirm.component';
import { Queen } from '../../models';
import { QueenService } from '../../services/queen.service';

const sheetActions: SheetActions = {
  actions: [
    { type: 'edit', transKey: 'edit' },
    { type: 'delete', transKey: 'delete' },
  ]
};

@Component({
  selector: 'bee-queen-details',
  templateUrl: './queen-details.component.html',
  styleUrls: [ './queen-details.component.css' ]
})
export class QueenDetailsComponent implements OnInit {

  queen$?: Observable<Queen | undefined>;

  get queenId(): string | null {
    return this.route.snapshot.paramMap.get('queenId');
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private queenService: QueenService,
    private bottomSheet: MatBottomSheet,
    @Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService
  ) { }

  ngOnInit(): void {
    const { queenId } = this;
    if (queenId) {
      this.queen$ = this.queenService.getQueen(queenId);
    }
  }

  back(): void {
    this.router.navigate([ '..' ], { relativeTo: this.route });
  }

  deleteQueen(queen: Queen): void {
    this.dialog.open<ConfirmComponent, ConfirmDialogData, boolean>(
      ConfirmComponent,
      {
        data: {
          title: `${this.i18NextService.format('delete', 'cap')} ${this.i18NextService.t('queen')}`,
          content: this.i18NextService.t('sentence.confirmDelete', { replace: { what: queen.name } })
        }
      }
    ).afterClosed()
      .pipe(
        filter(confirm => !!confirm),
        switchMap(() => this.queenService.deleteQueen(queen)
          .pipe(tap(() => this.back())))
      )
      .subscribe();
  }

  openBottomSheet(queen: Queen) {
    const sheet = this.bottomSheet.open<BottomSheetComponent, SheetActions>(BottomSheetComponent, {
      data: sheetActions,
      closeOnNavigation: true
    });
    sheet.instance.action$
      .pipe(
        tap(action => {
          switch (action) {
          case 'edit':
            this.navigateToEdit(this.queenId);
            break;
          case 'delete':
            this.deleteQueen(queen);
            break;
          default:
            throw new Error('no such action');
          }
          sheet.dismiss();
        }),
        take(1)
      ).subscribe();
  }

  navigateToEdit(queenId?: string | null): void {
    if (queenId) {
      this.router.navigate([ '../edit', queenId ], { relativeTo: this.route });
    }
  }

}
