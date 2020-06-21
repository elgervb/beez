import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hive } from '@common/hive';
import { Observable } from 'rxjs';
import { filter, switchMap, take, tap } from 'rxjs/operators';
import { DialogService } from 'src/app/shared/dialogs/dialog.service';

import { HiveService } from '../../services/hive.service';

@Component({
  selector: 'app-hive',
  templateUrl: './hive-overview.component.html',
  styleUrls: ['./hive-overview.component.css']
})
export class HiveOverviewComponent implements OnInit {

  hives$: Observable<Hive[]>;

  constructor(
    private router: Router,
    private hiveService: HiveService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.hives$ = this.hiveService.findAll();
  }

  edit(hive: Hive) {
    this.router.navigateByUrl(`${this.router.url}/edit/${hive.name}/${hive.number}`);
  }

  cancelEvent(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

  delete(hive: Hive) {
    const dialogRef = this.dialogService.confirm(
      {
        title: 'Delete hive',
        message: `Are you sure you want to delete hive ${hive.name}?`
      }
    );

    dialogRef.afterClosed()
      .pipe(
        filter(data => data),
        tap(() => this.hives$ = this.hiveService.delete(hive)
          .pipe(
            switchMap(() => this.hiveService.findAll())
          )
        ),
        take(1)
      ).subscribe();
  }

  trackHive(_: number, location: Hive) {
    return location.name;
  }
}
