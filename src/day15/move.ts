import { Unit, Tile, Point } from './extractUnits';

export interface Location extends Point {
  path: Point[];

}

export type DrawTile = Tile | 'E' | 'G' | 'O';

export const move = (unit: Unit, map: Tile[][], units: Unit[]) => {
  const drawnMap = drawMap(map, units);
  // const accessMap = drawAccessMap(unit, drawnMap);
  const enemies = units.filter(char => char.type !== unit.type);
  const tiles = getTargetTiles(enemies, map);
    // .filter(({ x, y }) => accessMap[x][y]);

  if (tiles.length > 0) {
    const location = getTargetLocation(unit, drawnMap);
    if (location && location.path.length > 0) {
      const target = location.path[0];
      unit.x = target.x;
      unit.y = target.y;
    }
  }
};

export const drawMap = (map: Tile[][], units: Unit[]): DrawTile[][] => {
  const newMap: DrawTile[][] = map.map(column => column.slice(0));

  units.forEach(unit => newMap[unit.x][unit.y] = unit.type);

  return newMap;
};

const getTargetLocation = (start: Unit, drawnMap: DrawTile[][]): Location|null => {
  const first: Location = { x: start.x, y: start.y, path: [] };
  const enemyType = (start.type === 'E') ? 'G' : 'E';
  const markedMap: DrawTile[][] = drawnMap.map(column => column.slice(0));
  const queue: Location[] = [first];

  while (queue.length > 0) {
    const current = queue.shift() as Location;

    const explore: Point[] = [
      { x: current.x, y: current.y - 1 },
      { x: current.x - 1, y: current.y },
      { x: current.x + 1, y: current.y },
      { x: current.x, y: current.y + 1 },
    ];

    for (let i = 0; i < explore.length; i += 1) {
      const { x, y } = explore[i];
      if (markedMap[x][y] === enemyType) {
        return current;
      }
      if (markedMap[x][y] === Tile.open) {
        markedMap[x][y] = 'O';
        queue.push(addPoint({ x, y }, current));
      }
    }
  }
  return null;
};

const addPoint = (point: Point, location: Location = { x: -1, y: -1, path: [] }): Location => {
  return {
    ...location,
    ...point,
    path: [...location.path, point],
  };
};

const getTargetTiles = (units: Unit[], map: Tile[][]): Point[] => {
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

const drawAccessMap = (start: Unit, drawnMap: DrawTile[][]): boolean[][] => {
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
