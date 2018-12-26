import { input } from './input';
import { getParts } from './getParts';
import { drawMap, Location, Tile } from './drawMap';
import { printMap } from './printMap';

export const day20_2 = (): number => {
  const parts = getParts(input.split(''));
  const { map, locations } = drawMap(parts);
  const longest = locations.reduce(
    (longest: Location, location) => (
      (longest.path.length >= location.path.length) ? longest : location
    ),
    { x: 0, y: 0, potential: [], path: [] },
  );
  const print = printMap(map, [longest], false);
  let count = 0;

  for (let y = 0; y < print.length; y += 1) {
    for (let x = 0; x < print[0].length; x += 1) {
      if (print[y][x] === Tile.far) {
        count += 1;
      }
    }
  }

  return count;
};
