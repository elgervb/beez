
export const queenColors = ['#FFFFFF', '#F5E35A', '#D93B25', '#81D555', '#489FF9'];

/**
 * determine international queen bee marking colors
 *
 * white: 1, 6
 * yellow: 2, 7
 * red: 3, 8
 * green 4, 9
 * blue: 5, 0
 *
 * source: https://www.piedmontbeekeepers.com/queen-bee-marking-colors
 */
export function queenColor(year: number): string {
  let yearEnd = parseInt(year.toString()[3], 10);

  // normalize colors
  if (yearEnd > 0 && yearEnd > 5) {
    yearEnd = yearEnd - 5;
  }

  return queenColors[yearEnd === 0 ? 4 : yearEnd - 1];
}
