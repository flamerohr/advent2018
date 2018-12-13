import { Cart } from './cart';

export const detectCollison = (target: Cart, carts: Cart[]) => {
  const potential: Cart | undefined = carts
    .find(cart => target.id !== cart.id && cart.x === target.x && cart.y === target.y);

  return potential;
};
