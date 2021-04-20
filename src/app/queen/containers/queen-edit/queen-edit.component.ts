import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { Queen } from '../../models';
import * as fromQueen from '../../store';

@Component({
  selector: 'app-queen-edit',
  templateUrl: './queen-edit.component.html',
  styleUrls: ['./queen-edit.component.css']
})
export class QueenEditComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store
  ) { }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addQueen(queen: Queen): void {
    this.store.select(fromQueen.selectQueens)
      .pipe(
        filter(queens => queens.some(q => q.name === queen.name)),
        tap(() => this.router.navigate(['..'], { relativeTo: this.route })),
        takeUntil(this.destroy$)
      ).subscribe();

    this.store.dispatch(fromQueen.addQueen({ queen }));
  }

  cancel(): void {
    this.router.navigate(['..'], { relativeTo: this.route });
  }

}
