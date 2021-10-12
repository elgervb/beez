import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { Queen } from '../../models';
import { QueenService } from '../../services/queen.service';

@Component({
  selector: 'bee-queen-list',
  templateUrl: './queen-list.component.html',
  styleUrls: [ './queen-list.component.css' ]
})
export class QueenListComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource<Queen>();
  displayedColumns: string[] = [ 'name', 'isMarked', 'isActive' ];

  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
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
    this.router.navigate([ 'add' ], { relativeTo: this.route });
  }

  select(queen: Queen): void {
    this.router.navigate([ queen.id ], { relativeTo: this.route });
  }

}
