export interface Rules {
  [index: string]: string;
}

// tslint:disable-next-line:max-line-length
export const initial = '##....#.#.#...#.#..#.#####.#.#.##.#.#.#######...#.##....#..##....#.#..##.####.#..........#..#...#';

export const rules = {
  '..#.#': '#',
  '.####': '#',
  '####.': '#',
  '#.#.#': '#',
  '###.#': '#',
  '...#.': '#',
  '#.##.': '#',
  '.#.##': '#',
  '#..##': '#',
  '.##..': '#',
  '##..#': '#',
  '.#...': '#',
  '.###.': '#',
  '#...#': '#',
  // '#....': '.',
  // '...##': '.',
  // '.#.#.': '.',
  // '..#..': '.',
  // '##.#.': '.',
  // '.....': '.',
  // '#.#..': '.',
  // '....#': '.',
  // '.#..#': '.',
  // '#..#.': '.',
  // '#####': '.',
  // '##.##': '.',
  // '..###': '.',
  // '###..': '.',
  // '#.###': '.',
  // '.##.#': '.',
  // '##...': '.',
  // '..##.': '.',
};