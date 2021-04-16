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
