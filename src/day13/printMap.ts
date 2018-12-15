import { Cart } from './cart';
import { Tile } from './map';
import { Reset, BgRed, BgGreen } from '../colours';

export const printMap = (map: Tile[][], carts: Cart[]) => {
  const printMap: string[][] = map.map(column => column.map(value => value));

  carts.forEach((cart) => {
    const status = printMap[cart.x][cart.y];
    if (['/', '\\', '|', '-', '+'].indexOf(status) === -1) {
      printMap[cart.x][cart.y] = `${BgRed}X${Reset}`;
      return;
    }
    printMap[cart.x][cart.y] = `${BgGreen}${cart.facing}${Reset}`;
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
