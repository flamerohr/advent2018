import { getMap } from './map';
import { input } from './input';
import { printMap } from './printMap';
import { detectCollison } from './detectCollison';
import { sortCarts } from './cart';

export const day13_1 = (): string => {
  const { map, carts } = getMap(input);
  let crashX = -1;
  let crashY = -1;

  ticker:
  while (true) {
    carts.sort(sortCarts);
    for (let i = 0; i < carts.length; i += 1) {
      const cart = carts[i];
      cart.forward();

      if (detectCollison(cart, carts)) {
        crashX = cart.x;
        crashY = cart.y;
        break ticker;
      }
    }
  }
  printMap(map, carts);

  return `${crashX},${crashY}`;
};
