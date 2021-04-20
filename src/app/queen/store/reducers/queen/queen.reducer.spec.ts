import { reducer, initialState } from './queen.reducer';
import * as queenActions from '../../actions/queen/queen.actions';

describe('Queen Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });

    it('should load queens', () => {
      const queens = [{ name: 'q1' }];
      const action = queenActions.loadQueensSuccess({ queens });
      const result = reducer(initialState, action);

      expect(result.queens).toBe(queens);
    });
  });
});
