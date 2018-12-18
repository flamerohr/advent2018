import { Tile } from './getMap';

export interface Point {
  x: number;
  y: number;
}

export interface TickOutput {
  map: Tile[][];
  actives: Point[];
}

export const tick = (map: Tile[][], actives: Point[]): TickOutput => {
  const newMap = map.map(lines => lines.slice(0));
  const newActives: Point[] = [];

  actives.forEach(({ x, y }) => {
    const next = newMap[x][y + 1];
    switch (next) {
      case Tile.sand: {
        newMap[x][y + 1] = Tile.waterFlow;
        newActives.push({ x, y: y + 1 });
        break;
      }
      case Tile.clay:
      case Tile.waterRest: {
        let lowestX = x;
        let highestX = x;
        let overflow = false;
        let ignore = false;
        const sameLevel = newActives
          .filter(active => active.x !== x && active.y === y)
          .map(active => active.x);

        for (let dX = x + 1; dX < map.length; dX += 1) {
          if (sameLevel.indexOf(dX) > -1) {
            ignore = true;
          }
          if (
            newMap[dX][y] === Tile.clay
          ) {
            highestX = dX;
            break;
          }
          if (
            newMap[dX - 1][y + 1] === Tile.clay &&
            (newMap[dX][y + 1] === Tile.sand || newMap[dX][y + 1] === Tile.waterFlow) &&
            (newMap[dX][y] === Tile.sand || newMap[dX][y] === Tile.waterFlow)
          ) {
            highestX = dX + 1;
            overflow = true;
            newActives.push({ y, x: dX });
            break;
          }
        }
        for (let dX = x - 1; dX >= 0; dX -= 1) {
          if (sameLevel.indexOf(dX) > -1) {
            ignore = true;
          }
          if (
            newMap[dX][y] === Tile.clay
          ) {
            lowestX = dX;
            break;
          }
          if (
            newMap[dX + 1][y + 1] === Tile.clay &&
            (newMap[dX][y + 1] === Tile.sand || newMap[dX][y + 1] === Tile.waterFlow) &&
            (newMap[dX][y] === Tile.sand || newMap[dX][y] === Tile.waterFlow)
          ) {
            lowestX = dX - 1;
            overflow = true;
            newActives.push({ y, x: dX });
            break;
          }
        }

        for (let dX = lowestX + 1; dX < highestX; dX += 1) {
          newMap[dX][y] = overflow ? Tile.waterFlow : Tile.waterRest;
        }
        if (!overflow || ignore) {
          newActives.push({ x, y: y - 1 });
        }
        break;
      }
    }
  });

  return {
    map: newMap,
    actives: newActives.filter((active, index) => {
      const targetIndex = newActives.findIndex(target => (
        target.x === active.x && target.y === active.y
      ));
      return targetIndex === index;
    }),
  };
};
