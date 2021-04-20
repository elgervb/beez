import { createAction, props } from '@ngrx/store';
import { Queen } from 'src/app/queen/models';

export const loadQueens = createAction(
  '[Queen] Load Queens'
);

export const loadQueensSuccess = createAction(
  '[Queen] Load Queens Success',
  props<{ queens: Queen[] }>()
);

export const loadQueensFailure = createAction(
  '[Queen] Load Queens Failure',
  props<{ error: any }>()
);

export const addQueen = createAction(
  '[Queen] Add Queen',
  props<{ queen: Queen }>()
);

export const addQueenSuccess = createAction(
  '[Queen] Add Queen Success'
);

export const addQueenFailure = createAction(
  '[Queen] Add Queen Failure',
  props<{ error: any }>()
);

export const deleteQueen = createAction(
  '[Queen] Delete Queen',
  props<{ queen: Queen }>()
);

export const deleteQueenSuccess = createAction(
  '[Queen] Delete Queen Success'
);

export const deleteQueenFailure = createAction(
  '[Queen] Delete Queen Failure',
  props<{ error: any }>()
);
