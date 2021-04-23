import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { ConfirmComponent, ConfirmDialogData } from 'src/app/shared/components/dialogs/confirm/confirm.component';
import { Queen } from '../../models';
import { QueenService } from '../../services/queen.service';

@Component({
  selector: 'app-queen',
  templateUrl: './queen.component.html',
  styleUrls: ['./queen.component.css']
})
export class QueenComponent implements OnInit {

  queens$: Observable<Queen[]>;

  displayedColumns: string[] = ['name', 'actions'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private queenService: QueenService
  ) { }

  ngOnInit(): void {
    this.queens$ = this.queenService.getQueens();
  }

  addQueen(): void {
    this.router.navigate(['add'], { relativeTo: this.route });
  }

  deleteQueen(queen: Queen, event?: MouseEvent): void {
    event?.stopPropagation();
    this.dialog.open<ConfirmComponent, ConfirmDialogData, boolean>(ConfirmComponent, { data: { title: 'Delete queen', content: `Are you sure you want to delete queen ${queen.name}?` } })
      .afterClosed().pipe(
        filter(confirm => !!confirm),
        tap(() => this.queenService.deleteQueen(queen))
      )
      .subscribe();

  }

  select(queen: Queen): void {
    this.router.navigate(['edit', queen.id], { relativeTo: this.route });
  }
}
