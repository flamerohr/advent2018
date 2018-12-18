import { getMap, Tile } from './getMap';
import { area } from './area';
import { tick } from './tick';

export const day18_1 = (): number => {
  let map: Tile[][] = getMap(area);

  for (let t = 0; t < 10; t += 1) {
    map = tick(map);
  }

  const count = {
    [Tile.open]: 0,
    [Tile.tree]: 0,
    [Tile.lumberyard]: 0,
  };

  for (let x = 0; x < map.length; x += 1) {
    for (let y = 0; y < map[x].length; y += 1) {
      const tile: Tile = map[x][y];
      count[tile] += 1;
    }
  }

  return count[Tile.tree] * count[Tile.lumberyard];
};
