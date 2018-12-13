import { getMap } from './map';
import { input } from './input';
import { printMap } from './printMap';
import { detectCollison } from './detectCollison';
import { sortCarts } from './cart';

export const day13_2 = (): string => {
  const output = getMap(input);
  let count = 0;
  const { map } = output;
  let { carts } = output;

  while (true) {
    carts.sort(sortCarts);
    const banned: number[] = [];
    for (let i = 0; i < carts.length; i += 1) {
      const cart = carts[i];
      cart.forward();
      const collider = detectCollison(cart, carts.filter(cart => banned.indexOf(cart.id) === -1));
      if (collider) {
        banned.push(collider.id);
        banned.push(cart.id);
      }
    }

    carts = carts.filter(cart => banned.indexOf(cart.id) === -1);
    if (carts.length <= 1) {
      break;
    }
    count += 1;
  }
  printMap(map, carts);

  // console.log(count);
  return `${carts[0].x},${carts[0].y}`;
};
