import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { Hive } from '../../models';
import { HiveService } from '../../services/hive.service';

@Component({
  selector: 'bee-hive-list',
  templateUrl: './hive-list.component.html',
  styleUrls: [ './hive-list.component.css' ]
})
export class HiveListComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<Hive>();
  displayedColumns: string[] = [ 'name', 'isActive' ];

  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private hiveService: HiveService
  ) { }

  ngOnInit(): void {
    this.hiveService.getHives()
      .pipe(
        tap(hives => this.dataSource.data = hives),
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

  addHive(): void {
    this.router.navigate([ 'add' ], { relativeTo: this.route });
  }

  select(hive: Hive): void {
    this.router.navigate([ hive.id ], { relativeTo: this.route });
  }

}
