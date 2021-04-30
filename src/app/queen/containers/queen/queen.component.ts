import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { ConfirmComponent, ConfirmDialogData } from 'src/app/shared/components/dialogs/confirm/confirm.component';
import { Queen } from '../../models';
import { QueenService } from '../../services/queen.service';

@Component({
  selector: 'bee-queen',
  templateUrl: './queen.component.html',
  styleUrls: ['./queen.component.css']
})
export class QueenComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource<Queen>();
  displayedColumns: string[] = ['name', 'isActive', 'actions'];

  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private queenService: QueenService
  ) { }

  ngOnInit(): void {
    this.queenService.getQueens()
      .pipe(
        tap(queens => this.dataSource.data = queens),
        takeUntil(this.destroy$)
      ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  addQueen(): void {
    this.router.navigate(['add'], { relativeTo: this.route });
  }

  deleteQueen(queen: Queen, event?: MouseEvent): void {
    event?.stopPropagation();
    this.dialog.open<ConfirmComponent, ConfirmDialogData, boolean>(
      ConfirmComponent,
      { data: { title: 'Delete queen', content: `Are you sure you want to delete queen ${queen.name}?` } }
    ).afterClosed()
      .pipe(
        filter(confirm => !!confirm),
        tap(() => this.queenService.deleteQueen(queen))
      )
      .subscribe();

  }

  select(queen: Queen): void {
    this.router.navigate(['edit', queen.id], { relativeTo: this.route });
  }
}
