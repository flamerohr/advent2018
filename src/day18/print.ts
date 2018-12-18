import { Tile } from './getMap';
import { Reset, FgGreen, FgWhite, FgYellow } from '../colours';

export const print = (map: Tile[][]): void => {
  const print: string[][] = [];

  for (let x = 0; x < map.length; x += 1) {
    for (let y = 0; y < map[x].length; y += 1) {
      if (!print[y]) {
        print[y] = [];
      }
      const tile = map[x][y];
      const colour = getColour(tile);
      print[y].push(`${colour}${tile}${Reset}`);
    }
  }

  console.log(print.map(line => line.join('')).join('\n'));
};

const getColour = (tile: Tile): string => {
  switch (tile) {
    case Tile.open:
      return FgWhite;
    case Tile.tree:
      return FgGreen;
    case Tile.lumberyard:
      return FgYellow;
  }
};
