import { queenColor } from './queen-color';

// tslint:disable: no-magic-numbers
describe('queen-color', () => {

  it('should return white for year ending in 1 and 6', () => {
    expect(queenColor(2011)).toBe('#FFFFFF');
    expect(queenColor(2026)).toBe('#FFFFFF');
  });

  it('should return yellow for year ending in 2 and 7', () => {
    expect(queenColor(2012)).toBe('#F5E35A');
    expect(queenColor(2027)).toBe('#F5E35A');
  });

  it('should return yellow for year ending in 3 and 8', () => {
    expect(queenColor(2013)).toBe('#D93B25');
    expect(queenColor(2028)).toBe('#D93B25');
  });

  it('should return yellow for year ending in 4 and 9', () => {
    expect(queenColor(2014)).toBe('#81D555');
    expect(queenColor(2029)).toBe('#81D555');
  });

  it('should return yellow for year ending in 5 and 0', () => {
    expect(queenColor(2015)).toBe('#489FF9');
    expect(queenColor(2030)).toBe('#489FF9');
  });
});
