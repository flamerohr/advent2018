import { Cart } from './cart';
import { Tile } from './map';

export const printMap = (map: Tile[][], carts: Cart[]) => {
  const printMap: string[][] = map.map(column => column.map(value => value));

  const RESET = '\x1b[0m';
  const RED = '\x1b[41m';
  const GREEN = '\x1b[42m';
  carts.forEach((cart) => {
    const status = printMap[cart.x][cart.y];
    if (['/', '\\', '|', '-', '+'].indexOf(status) === -1) {
      printMap[cart.x][cart.y] = `${RED}X${RESET}`;
      return;
    }
    printMap[cart.x][cart.y] = `${GREEN}${cart.facing}${RESET}`;
  });

  const output = [];
  for (let y = 0; y < printMap[0].length; y += 1) {
    for (let x = 0; x < printMap.length; x += 1) {
      output.push(printMap[x][y]);
    }
    output.push('\n');
  }

  console.log(output.join(''));
};
