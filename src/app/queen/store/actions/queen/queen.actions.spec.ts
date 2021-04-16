import * as fromQueen from './queen.actions';

describe('loadQueens', () => {
  it('should return an action', () => {
    expect(fromQueen.loadQueens().type).toBe('[Queen] Load Queens');
  });
});
