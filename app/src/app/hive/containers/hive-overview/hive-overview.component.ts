import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HiveService } from '../../services/hive.service';
import { Hive } from '@common/hive';
import { switchMap, take, filter, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/shared/dialogs/dialog.service';

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
