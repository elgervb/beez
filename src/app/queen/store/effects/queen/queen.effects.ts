import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as QueenActions from '../../actions/queen/queen.actions';
import { QueenService } from 'src/app/queen/services/queen.service';

@Injectable()
export class QueenEffects {

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
