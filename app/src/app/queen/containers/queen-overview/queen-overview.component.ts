import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Queen } from '@common/queen';
import { Observable } from 'rxjs';
import { filter, switchMap, take, tap } from 'rxjs/operators';
import { DialogService } from 'src/app/shared/dialogs/dialog.service';

import { QueenService } from '../../services/queen.service';

@Component({
  selector: 'app-queen',
  templateUrl: './queen-overview.component.html',
  styleUrls: ['./queen-overview.component.css']
})
export class QueenOverviewComponent implements OnInit {

  queens$: Observable<Queen[]>;

  constructor(
    private router: Router,
    private queenService: QueenService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.queens$ = this.queenService.findAll();
  }

  cancelEvent(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

  delete(queen: Queen) {
    const dialogRef = this.dialogService.confirm(
      {
        title: 'Delete queen',
        message: `Are you sure you want to delete queen ${queen.name}?`
      });

    dialogRef.afterClosed()
      .pipe(
        filter(data => data),
        tap(() => this.queens$ = this.queenService.delete(queen)
          .pipe(
            switchMap(() => this.queenService.findAll())
          )
        ),
        take(1)
      ).subscribe();

  }

  edit(queen: Queen) {
    this.router.navigateByUrl(`${this.router.url}/edit/${queen.name}`);
  }

  trackQueen(_: number, queen: Queen) {
    return queen.name;
  }

}
