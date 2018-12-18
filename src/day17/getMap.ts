export enum Tile {
  spring = '+',
  clay = '#',
  sand = '.',
  waterRest = '~',
  waterFlow = '|',
}

// x=495, y=2..7
const parserX = /x=([\d.]+|([\d.]+..[\d.]+))/;
const parserY = /y=([\d.]+|([\d.]+..[\d.]+))/;

export const getMap = (description: string): Tile[][] => {
  const map: Tile[][] = [];
  let highestX = -1;
  let highestY = -1;
  let lowestX = -1;
  let lowestY = -1;

  const lines = description.split('\n');

  lines.forEach((line) => {
    const matchX = line.match(parserX);
    const matchY = line.match(parserY);
    if (!matchX || !matchY) {
      return;
    }
    const rangeX = matchX[1].split('..');
    const rangeY = matchY[1].split('..');

    const minX = Number(rangeX[0]);
    const maxX = Number(rangeX[1]);

    const minY = Number(rangeY[0]);
    const maxY = Number(rangeY[1]);

    if (minX > highestX) {
      highestX = minX;
    }
    if (lowestX === -1 || minX < lowestX) {
      lowestX = minX;
    }
    if (minY > highestY) {
      highestY = minY;
    }
    if (lowestY === -1 || minY < lowestY) {
      lowestY = minY;
    }

    if (maxX && !Number.isNaN(maxX)) {
      if (maxX > highestX) {
        highestX = maxX;
      }
      for (let x = minX; x <= Number(maxX); x += 1) {
        if (!map[x]) {
          map[x] = [];
        }
        map[x][minY] = Tile.clay;
      }
    } else if (maxY && !Number.isNaN(maxY)) {
      if (maxY > highestY) {
        highestY = maxY;
      }
      if (!map[minX]) {
        map[minX] = [];
      }
      for (let y = minY; y <= Number(maxY); y += 1) {
        map[minX][y] = Tile.clay;
      }
    } else {
      map[minX][minY] = Tile.clay;
    }
  });

  map[500][0] = Tile.spring;
  for (let x = 0; x <= highestX + 1; x += 1) {
    if (!map[x]) {
      map[x] = [];
    }
    if (x < lowestX - 1) {
      continue;
    }
    for (let y = 0; y <= highestY; y += 1) {
      map[x][y] = map[x][y] || Tile.sand;
    }
  }

  return map;
};
