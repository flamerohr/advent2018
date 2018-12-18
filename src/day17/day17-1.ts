import { getMap, Tile } from './getMap';
import { scan } from './scan';
import { print } from './print';
import { Point, tick } from './tick';

export const day17_1 = (): string => {
  const initial: Tile[][] = getMap(scan);
  let actives: Point[] = [{ x: 500, y: 0 }];

  let map = initial;

  while (actives.length > 0) {
    const next = tick(map, actives);
    map = next.map;
    actives = next.actives;
  }

  let start = false;
  let all = 0;
  let still = 0;
  for (let y = 0; y < map[map.length - 1].length; y += 1) {
    for (let x = 0; x < map.length; x += 1) {
      const tile = map[x][y];
      if (tile === Tile.clay) {
        start = true;
      }
      if (start) {
        if (tile === Tile.waterFlow || tile === Tile.waterRest) {
          // part 1
          all += 1;
        }
        if (tile === Tile.waterRest) {
          // part 2
          still += 1;
        }
      }
    }
  }

  // print(map, actives);
  return `${all},${still}`;
};
