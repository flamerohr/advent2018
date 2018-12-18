import { Tile } from './getMap';

export interface AreaCount {
  [Tile.open]: number;
  [Tile.tree]: number;
  [Tile.lumberyard]: number;
}

export const tick = (map: Tile[][]): Tile[][] => {
  const newMap: Tile[][] = map.map(row => row.slice(0));

  for (let x = 0; x < map.length; x += 1) {
    for (let y = 0; y < map[x].length; y += 1) {
      const count: AreaCount = countArea(map, x, y);
      const tile: Tile = map[x][y];

      switch (tile) {
        case Tile.open: {
          if (count[Tile.tree] >= 3) {
            newMap[x][y] = Tile.tree;
          }
          break;
        }
        case Tile.tree: {
          if (count[Tile.lumberyard] >= 3) {
            newMap[x][y] = Tile.lumberyard;
          }
          break;
        }
        case Tile.lumberyard: {
          if (count[Tile.tree] === 0 || count[Tile.lumberyard] === 0) {
            newMap[x][y] = Tile.open;
          }
          break;
        }
      }
    }
  }

  return newMap;
};

export const countArea = (map: Tile[][], x: number, y: number): AreaCount => {
  const count = {
    [Tile.open]: 0,
    [Tile.tree]: 0,
    [Tile.lumberyard]: 0,
  };

  for (let dX = -1; dX <= 1; dX += 1) {
    if (!map[x + dX]) {
      continue;
    }
    for (let dY = -1; dY <= 1; dY += 1) {
      const tile: Tile = map[x + dX][y + dY];
      if (!tile || (dX === 0 && dY === 0)) {
        continue;
      }
      count[tile] += 1;
    }
  }

  return count;
};
