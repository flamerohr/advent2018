import { Tile } from './getMap';
import { FgCyan, FgBlue, FgWhite, FgGreen, FgYellow, Reset, BgBlue } from '../colours';
import { Point } from './tick';

export const print = (map: Tile[][], actives: Point[] = [], lowest: number = 0) => {
  const print: string[][] = [];

  for (let x = 0; x < map.length; x += 1) {
    for (let y = lowest ? lowest - 30 : 0; y < map[x].length; y += 1) {
      if (lowest && y > Math.max(lowest, 30) + 2) {
        break;
      }
      if (!print[y]) {
        print[y] = [];
      }
      const tile = map[x][y];
      const colour = getColour(tile);
      const active = actives.find(item => item.x === x && item.y === y);
      print[y].push(`${active ? BgBlue : ''}${colour}${tile}${Reset}`);
    }
  }

  console.log(print.map(line => line.join('')).filter(line => line).join('\n'));
};

const getColour = (tile: Tile): string => {
  switch (tile) {
    case Tile.spring:
      return FgGreen;
    case Tile.waterRest:
      return FgBlue;
    case Tile.waterFlow:
      return FgCyan;
    case Tile.sand:
      return FgWhite;
    case Tile.clay:
      return FgYellow;
  }
};
