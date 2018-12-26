import { Tile, Location } from './drawMap';
import { Reset, BgBlue, BgGreen, FgRed, BgRed, BgYellow, FgBlack, FgYellow, FgBlue } from '../colours';

export const printMap = (map: Tile[][], active: Location[] = [], silent = true): string[][] => {
  const indexesX = Object.keys(map).map(Number);
  const lowestX = Math.min(...indexesX) - 2;
  const highestX = Math.max(...indexesX) + 2;

  let indexesY: number[] = [];
  for (let x = 0; x <= highestX - lowestX; x += 1) {
    const column = map[x + lowestX] || [];
    indexesY = indexesY.concat(Object.keys(column).map(Number));
  }
  const lowestY = Math.min(...indexesY) - 2;
  const highestY = Math.max(...indexesY) + 2;

  const print: string[][] = [];
  for (let x = 0; x <= highestX - lowestX; x += 1) {
    const column = map[x + lowestX] || [];
    for (let y = 0; y <= highestY - lowestY; y += 1) {
      if (!print[y]) {
        print[y] = [];
      }
      print[y][x] = `${FgBlack}X${Reset}`;
      if (column[y + lowestY]) {
        print[y][x] = column[y + lowestY];
      }
    }
  }

  if (!silent) {
    const copy = print.map(row => row.slice(0));
    active.forEach(({ x, y, path }) => {
      let lastPoint = { x: 0, y: 0 };
      path.forEach((point) => {
        copy[point.y * 2 - lowestY][point.x * 2 - lowestX] =
        `${FgRed}${copy[point.y * 2 - lowestY][point.x * 2 - lowestX]}${Reset}`;

        copy[point.y + lastPoint.y - lowestY][point.x + lastPoint.x - lowestX] =
        `${FgRed}${copy[point.y + lastPoint.y - lowestY][point.x + lastPoint.x - lowestX]}${Reset}`;

        lastPoint = point;
      });
      copy[y * 2 - lowestY][x * 2 - lowestX] =
      `${BgRed}${copy[y * 2 - lowestY][x * 2 - lowestX]}${Reset}`;
    });
    for (let x = 0; x <= highestX - lowestX; x += 1) {
      for (let y = 0; y <= highestY - lowestY; y += 1) {
        const type = copy[y][x];

        if (type.indexOf(Tile.open) !== -1) {
          copy[y][x] = `${BgYellow}${FgYellow}${copy[y][x]}${Reset}`;
        }
        if (type.indexOf(Tile.far) !== -1) {
          copy[y][x] = `${BgBlue}${FgBlue}${copy[y][x]}${Reset}`;
        }
      }
    }

    const output = copy.map(row => row.join('')).join('\n');
    console.log(output);
  }
  return print;
};
