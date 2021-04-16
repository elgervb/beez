import { createReducer, on } from '@ngrx/store';
import { Queen } from '../../../models';
import * as QueenActions from '../../actions/queen/queen.actions';

export const queenFeatureKey = 'queen';

export interface State {
  queens: Queen[];
}

export const initialState: State = {
  queens: []
};


export const reducer = createReducer(
  initialState,

  on(QueenActions.loadQueens, state => state),
  on(QueenActions.loadQueensSuccess, (state, action) => ({ ...state, queens: action.queens })),
  on(QueenActions.loadQueensFailure, state => state),

);

