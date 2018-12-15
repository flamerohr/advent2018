import { Unit, Tile } from './extractUnits';

export interface Point {
  x: number;
  y: number;
}

export type DrawTile = Tile | 'E' | 'G';

export const move = (unit: Unit, map: Tile[][], units: Unit[]) => {
  const accessMap = drawAccessMap(unit, map, units);
  const output: string[] = [];
  for (let x = 0; x < accessMap.length; x += 1) {
    for (let y = 0; y < accessMap.length; y += 1) {
      if (!output[y]) {
        output[y] = '';
      }
      output[y] += accessMap[x][y] ? 'X' : '.';
    }
  }

  console.log(output.join('\n'));
  return;
  const enemies = units.filter(char => char.type !== unit.type);
  const tiles = getPotentialTiles(enemies, map);
};

export const drawMap = (map: Tile[][], units: Unit[]): DrawTile[][] => {
  const newMap: DrawTile[][] = map.map(column => column.slice(0));

  units.forEach(unit => newMap[unit.x][unit.y] = unit.type);

  return newMap;
};

const drawAccessMap = (start: Unit, map: Tile[][], units: Unit[]): boolean[][] => {
  const drawnMap = drawMap(map, units);
  const accessMap: boolean[][] = [];

  fillAccessMap(start.x, start.y, accessMap, drawnMap, true);
  return accessMap;
};

const fillAccessMap = (
  x: number,
  y: number,
  accessMap: boolean[][],
  drawnMap: DrawTile[][],
  start = false,
) => {
  if (!accessMap[x]) {
    accessMap[x] = [];
  }
  if ((accessMap[x][y] !== undefined || drawnMap[x][y] !== Tile.open) && !start) {
    accessMap[x][y] = accessMap[x][y] || false;
    return;
  }
  accessMap[x][y] = true;
  fillAccessMap(x - 1, y, accessMap, drawnMap);
  fillAccessMap(x + 1, y, accessMap, drawnMap);
  fillAccessMap(x, y - 1, accessMap, drawnMap);
  fillAccessMap(x, y + 1, accessMap, drawnMap);
};

const getPotentialTiles = (units: Unit[], map: Tile[][]): Point[] => {
  const tiles: Point[] = [];

  units.forEach((unit) => {
    if (map[unit.x][unit.y - 1] === Tile.open) {
      tiles.push({
        x: unit.x,
        y: unit.y - 1,
      });
    }
    if (map[unit.x - 1][unit.y] === Tile.open) {
      tiles.push({
        x: unit.x - 1,
        y: unit.y,
      });
    }
    if (map[unit.x + 1][unit.y] === Tile.open) {
      tiles.push({
        x: unit.x + 1,
        y: unit.y,
      });
    }
    if (map[unit.x][unit.y + 1] === Tile.open) {
      tiles.push({
        x: unit.x,
        y: unit.y + 1,
      });
    }
  });

  return tiles;
};
