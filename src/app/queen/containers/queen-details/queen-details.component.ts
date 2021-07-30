import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { I18NEXT_SERVICE, ITranslationService } from 'angular-i18next';
import { Observable } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { ConfirmComponent, ConfirmDialogData } from 'components';
import { Queen } from '../../models';
import { QueenService } from '../../services/queen.service';

@Component({
  selector: 'bee-queen-details',
  templateUrl: './queen-details.component.html',
  styleUrls: ['./queen-details.component.css']
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
    @Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService
  ) { }

  ngOnInit(): void {
    const queenId = this.queenId;
    if (queenId) {
      this.queen$ = this.queenService.getQueen(queenId);
    }
  }

  back(): void {
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  deleteQueen(queen: Queen, event?: MouseEvent): void {
    event?.stopPropagation();
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
        switchMap(
          () => this.queenService.deleteQueen(queen)
            .pipe(
              tap(() => this.back()))
        )
      )
      .subscribe();
  }

  navigateToEdit(queenId: string | null): void {
    if (queenId) {
      this.router.navigate(['../edit', queenId], { relativeTo: this.route });
    }
  }

}
