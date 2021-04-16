import * as fromQueen from '../../reducers/queen/queen.reducer';
import { selectQueenState } from './queen.selectors';

describe('Queen Selectors', () => {
  it('should select the feature state', () => {
    const result = selectQueenState({
      [fromQueen.queenFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
