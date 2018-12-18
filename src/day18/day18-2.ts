import { getMap, Tile } from './getMap';
import { area } from './area';
import { tick } from './tick';

export const day18_2 = (): number => {
  let map: Tile[][] = getMap(area);
  const previousState: string[] = [];
  let startIndex: number = -1;
  let cycle: number = -1;

  let t = 0;
  while (t < 1000000000) {
    map = tick(map);
    // faster than joining
    const stringified = JSON.stringify(map);
    const previousIndex = previousState.indexOf(stringified);
    if (previousIndex > -1) {
      startIndex = previousIndex;
      cycle = t - previousIndex;
      console.log(startIndex, cycle);
      break;
    }
    previousState.push(stringified);
    t += 1;
  }

  if (startIndex !== -1 || cycle !== -1) {
    const targetIndex = startIndex + ((1000000000 - startIndex) % cycle) - 1;

    // faster than splitting
    map = JSON.parse(previousState[targetIndex]);
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
