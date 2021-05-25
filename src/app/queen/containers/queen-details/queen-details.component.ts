import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { ConfirmComponent, ConfirmDialogData } from 'src/app/shared/components/dialogs/confirm/confirm.component';
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
    private queenService: QueenService
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
      { data: { title: 'Delete queen', content: `Are you sure you want to delete queen ${queen.name}?` } }
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
