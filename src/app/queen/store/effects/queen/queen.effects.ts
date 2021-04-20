import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as QueenActions from '../../actions/queen/queen.actions';
import { QueenService } from 'src/app/queen/services/queen.service';

@Injectable()
export class QueenEffects {

  // TODO: rename add to create
  addQueen$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(QueenActions.addQueen),
      concatMap(action => this.queenService.createQueen(action.queen).pipe(
        map(() => QueenActions.addQueenSuccess()),
        catchError(error => of(QueenActions.addQueenFailure({ error }))))
      )
    );
  });

  deleteQueen$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(QueenActions.deleteQueen),
      concatMap(action => this.queenService.deleteQueen(action.queen).pipe(
        map(() => QueenActions.deleteQueenSuccess()),
        catchError(error => of(QueenActions.deleteQueenFailure({ error }))))
      )
    );
  });

  loadQueens$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(QueenActions.loadQueens),
      concatMap(() => this.queenService.getQueens().valueChanges().pipe(
        map(queens => QueenActions.loadQueensSuccess({ queens })),
        catchError(error => of(QueenActions.loadQueensFailure({ error }))))
      )
    );
  });

  constructor(
    private queenService: QueenService,
    private actions$: Actions
  ) { }

}
