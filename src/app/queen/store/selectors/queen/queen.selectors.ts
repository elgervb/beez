import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromQueen from '../../reducers/queen/queen.reducer';

export const selectQueenState = createFeatureSelector<fromQueen.State>(
  fromQueen.queenFeatureKey
);

export const selectQueens = createSelector(selectQueenState, state => state.queens);
