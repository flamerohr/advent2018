import { input } from './input';
import { getParts } from './getParts';
import { drawMap, Location } from './drawMap';
import { printMap } from './printMap';

export const day20_1 = (): number => {
  const parts = getParts(input.split(''));
  const { map, locations } = drawMap(parts);
  // printMap(map);

  return Math.max(...locations.map(({ path }) => path.length));
};
