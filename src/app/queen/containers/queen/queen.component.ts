import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Queen } from '../../models';
import * as fromQueens from '../../store/';

@Component({
  selector: 'app-queen',
  templateUrl: './queen.component.html',
  styleUrls: ['./queen.component.css']
})
export class QueenComponent implements OnInit {

  queens$: Observable<Queen[]>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.queens$ = this.store.select(fromQueens.selectQueens)
      .pipe(
        tap(queens => console.log(queens))
      );

    this.store.dispatch(fromQueens.loadQueens());
  }

}
