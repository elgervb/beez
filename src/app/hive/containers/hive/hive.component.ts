import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { ConfirmComponent, ConfirmDialogData } from 'src/app/shared/components/dialogs/confirm/confirm.component';
import { Hive } from '../../models';
import { HiveService } from '../../services/hive.service';

@Component({
  selector: 'bee-hive',
  templateUrl: './hive.component.html',
  styleUrls: ['./hive.component.css']
})
export class HiveComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource<Hive>();
  displayedColumns: string[] = ['name', 'isActive', 'actions'];


  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
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
    this.router.navigate(['add'], { relativeTo: this.route });
  }

  deleteHive(hive: Hive, event?: MouseEvent): void {
    event?.stopPropagation();
    this.dialog.open<ConfirmComponent, ConfirmDialogData, boolean>(
      ConfirmComponent,
      { data: { title: 'Delete hive', content: `Are you sure you want to delete hive ${hive.name}?` } }
    ).afterClosed()
      .pipe(
        filter(confirm => !!confirm),
        tap(() => this.hiveService.deleteHive(hive))
      )
      .subscribe();

  }

  select(hive: Hive): void {
    this.router.navigate(['edit', hive.id], { relativeTo: this.route });
  }
}
